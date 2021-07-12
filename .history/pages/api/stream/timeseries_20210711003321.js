
import redis from '../../../lib/redis'


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

export default async function handler(req, res) {
    var timeseries = []
    var details = [];

    var freqs = {}
    var count = 0
    var skipped = 0 
    let baseline = 0

    try {
        // const { email } = req.query;

        const rawClickstream = await redis.lrange(`clickstream.global`, 0, -1);
        const clickstream = sortClickstream(rawClickstream)

        var maxFreq = Number.MIN_SAFE_INTEGER
        let maxFreqIndex = -1
        let windowStart = 0
        let windowEnd = 0

        clickstream.forEach((click) => {
            const details = JSON.parse(click)

            if(baseline===-1) {
                baseline = details.timestamp
            }

            if(details.timestamp) {
                let datetime = new Date(parseInt(details.timestamp))
                let datestr = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}`
                
                let currFreq = freqs[datestr] ?  freqs[datestr] + 1 : 1
                freqs[datestr] = currFreq

                windowStart = (windowStart===0) ? parseInt(details.timestamp) : Math.min(windowStart, parseInt(details.timestamp))
                latestEvent = (latestEvent===0) ? parseInt(details.timestamp) : Math.max(windowEnd, parseInt(details.timestamp))
                
                maxFreq = Math.max(maxFreq, freqs[datestr])
                if(maxFreq===freqs[datestr]) {
                    maxFreqIndex = datestr
                }

                timeseries.push({
                    x: datestr,
                    y: count
                }); 
                details.push({
                    date: new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()),
                    index: count,
                    slug: details.slug,
                    destination: details.destination,
                })
            } else {
                skipped++; 
            }
            count++;
        }); 

        let average = count===1 ? timeseries[0].x : count===0 ? 0 : -1 * (timeseries[count-skipped - 1].x - timeseries[0].x)/(count - skipped)
        
        let statistics =  {
            skipped, 
            count, 
            average, 
            maxFreq,
            maxFreqIndex, 
            windowStart, 
            windowEnd
        }
        
        res.status(200).json({ timeseries, details, freqs, statistics }); 
    } catch (error) {
        console.log(error.message)
        console.log(`Iteration ended at counter: ${count}`)
        res.status(500).json({ error: "unable to fetch data" })
    }
}