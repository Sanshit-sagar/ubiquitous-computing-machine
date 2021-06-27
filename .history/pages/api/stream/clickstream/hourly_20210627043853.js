
import redis from '../../../lib/redis'

export default async function handler(req, res) {
    var timeseries = [];
    var freqs = {}
    var count = 0;
    var skipped = 0; 
    var max = Number.MIN_SAFE_INTEGER

    try {
        const clickstream = await redis.lrange(`clickstream.global`, 0, -1);

        clickstream.forEach((click) => {
            const details = JSON.parse(click)

            if(details.timestamp || details.misc && details.misc?.finalTimestamp) {
                let timestamp = details.timestamp ? details.timestamp : details.misc.finalTimestamp
                let date = new Date(parseInt(timestamp))
                 
                let hourlyStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`
            
                let currFreq = 1
                if(freqs[hourlyStr]) {
                    currFreq = freqs[hourlyStr] + 1
                } 
                freqs[hourlyStr] = currFreq
                max = Math.max(max, currFreq)

                timeseries.push({
                    x: hourlyStr,
                    y: count,
                }); 
            } else {
                skipped++; 
            }
            count++;
        }); 
        
        let average = count===1 ? timeseries[0].x : count===0 ? 0 : -1 * (timeseries[count -skipped - 1].x - timeseries[0].x)/(count - skipped)    
        res.status(200).json({ timeseries, skipped, count, freqs, average, max })
    } catch (error) {
        console.log(error.message)
        console.log(`Iteration ended at counter: ${count}`)
        res.status(500).json({ error: "unable to fetch data" })
    }
}