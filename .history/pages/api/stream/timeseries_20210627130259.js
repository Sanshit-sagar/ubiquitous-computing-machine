
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
    var timeseries = [];
    var count = 0;
    var skipped = 0; 
    var freqs = {}
    let baseline = 0

    try {
        const rawClickstream = await redis.lrange(`clickstream.global`, 0, -1);
        const clickstream = sortClickstream(rawClickstream)

        var max = Number.MIN_SAFE_INTEGER
        let earliestEvent = 0
        let latestEvent = 0
        let maxIndex = -1

        clickstream.forEach((click) => {
            const details = JSON.parse(click)

            if(baseline===-1) {
                baseline = details.timestamp
            }

            if(details.timestamp || details.misc && details.misc?.finalTimestamp) {
                let timestamp = (details.timestamp) ? parseInt(details.timestamp) : parseInt(details.misc.finalTimestamp);
                let date = new Date(timestamp)
                let datestr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                
                let currFreq = freqs[datestr] ?  freqs[datestr] + 1 : 1
                freqs[datestr] = currFreq

                earliestEvent = earliestEvent===0 ? parseInt(timestamp) : Math.min(earliestEvent, parseInt(timestamp))
                latestEvent = latestEvent===0 ? parseInt(timestamp) : Math.max(latestEvent, parseInt(timestamp))
                
                max = Math.max(max, freqs[datestr])
                if(max===freqs[datestr]) {
                    maxIndex = datestr
                }

                timeseries.push({
                    x: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    y: count,
                }); 
            } else {
                skipped++; 
            }
            count++;
        }); 
        console.log(`RETURNING THIS**** ${JSON.stringify(timeseries)}`)
        console.log(freqs)
        let average = count===1 ? timeseries[0].x : count===0 ? 0 : -1 * (timeseries[count -skipped - 1].x - timeseries[0].x)/(count - skipped)
        res.status(200).json({ timeseries, skipped, count, freqs, average, max, maxIndex, earliestEvent, latestEvent })

    } catch (error) {
        console.log(error.message)
        console.log(`Iteration ended at counter: ${count}`)
        res.status(500).json({ error: "unable to fetch data" })
    }
}