
import redis from '../../../lib/redis'

export default async function handler(req, res) {
    var timeseries = [];
    var count = 0;
    var skipped = 0; 
    var freqs = {}
    
    let maxTime = Number.MIN_VALUE
    let minTime = Number.MAX_VALUE

    try {
        const clickstream = await redis.lrange(`clickstream.global`, 0, -1);


        clickstream.forEach((click) => {
            const details = JSON.parse(click)

            if(details.timestamp || details.misc && details.misc?.finalTimestamp) {
               
                let date = ''
                if(details.timestamp) {
                    date = new Date(parseInt(details.timestamp)) 
                } else {
                    date = new Date(parseInt(details.misc.finalTimestamp))
                }

                let clonedDate = new Date(date).getTime()

                minTime = Math.min(minTime, clonedDate)
                maxTime = Math.min(maxTime, clonedDate)

                let hourlyStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`
                
                // let fourHourlyStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}@${date.getHours()%4}`;
                
                let currFreq = 1
                if(freqs[hourlyStr]) {
                    currFreq = freqs[hourlyStr] + 1
                } 
                freqs[hourlyStr] = currFreq

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
        res.status(200).json({ timeseries, skipped, count, freqs, average })
    } catch (error) {
        console.log(error.message)
        console.log(`Iteration ended at counter: ${count}`)
        res.status(500).json({ error: "unable to fetch data" })
    }
}