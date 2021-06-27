
import redis from '../../../../lib/redis'
import { getSession } from 'next-auth/client'

function sortClickstream(rawClickstream) {
    return rawClickstream.sort((a, b) => {
        let arrA = JSON.parse(a);
        let arrB = JSON.parse(b);

        if(arrA.timestamp && arrB.timestamp) {
            return arrA.timestamp - arrB.timestamp
        } else if(arrA.misc && arrA.misc.finalTimestamp && arrB.misc && arrB.misc.finalTimestamp) {
            return arrA.misc.finalTimestamp - arrB.misc.finalTimestamp
        } else if(arrA.timestamp || arrA.misc && arrA.misc.finalTimestamp) {
            return arrA.misc.finalTimestamp 
        } 
        return arrB.misc ? arrB.misc.finalTimestamp : 0
    });
}

function mergedSeries(start, end, freqs, stepSize) {
    let mergedArrs = [];

    let i; 
    let prevStep = start;
    let counter = 0;

    for(i=0; i <= (end-start)/stepSize; i++) {
        prevStep += stepSize;
        let date =  new Date(prevStep);
        let datestr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`

        if(freqs[datestr]) {
            counter += freqs[datestr]
        };

        mergedArrs.push({ x: datestr, y: parseInt(counter) });
    }
    console.log(`Generate series with ${emptyTimeseries.length} slots`);
    return mergedArrs;
}

export default async function handler(req, res) {
    const session = await getSession({ req })
    
    if(!session) {
        res.status(500).json({ error: 'Unauthenticated' });
    } 
    
    var timeseries = []
    var freqs = {}
    var count = 0
    var skipped = 0 

    try {
        const rawClickstream = await redis.lrange(`clickstream.global`, 0, -1)
        const clickstream = sortClickstream(rawClickstream)

        var max = Number.MIN_SAFE_INTEGER
        let minTime = 0
        let maxTime = 0
        let maxIndex = -1

        clickstream.forEach((click) => {
            const details = JSON.parse(click)

            if(details.timestamp || details.misc && details.misc?.finalTimestamp) {
                
                let timestamp = details.timestamp ? details.timestamp : details.misc.finalTimestamp
                let date = new Date(parseInt(timestamp)) 
                
                let hourlyStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`
                freqs[hourlyStr] = freqs[hourlyStr] ? freqs[hourlyStr]+1 : 1
            
                minTime = minTime===0 ? parseInt(timestamp) : Math.min(minTime, parseInt(timestamp))
                maxTime = maxTime===0 ? parseInt(timestamp) : Math.max(maxTime, parseInt(timestamp))
                
                max = Math.max(max, freqs[hourlyStr])
                if(max===freqs[hourlyStr]) maxIndex = hourlyStr
                
                timeseries.push({ x: hourlyStr, y: count });
            } else {
                skipped++; 
            }
            count++;
        }); 
       
        let timespan = (maxTime - minTime)/ (1000*60*60*24)
        let average = count<=1 ? count : (count-skipped)/timespan  
        let emptyTimeseries = generateEmptyTimeseries(minTime, maxTime, freqs, 60*60*1000)

        // let mergedSeries = mergeSeries(emptyTimeseries, timeseries)
        console.log(emptyTimeseries)
        console.log(timeseries)
        console.log(freqs)

        res.status(200).json({ timeseries, freqs, skipped, count, average, max, minTime, maxTime, timespan, emptyTimeseries })
    } catch (error) {
        console.log(`Iteration ended at counter: ${count} because: ${error.message}`)
        res.status(500).json({ error: `Encountered an error ${error.message}` })
    }
}