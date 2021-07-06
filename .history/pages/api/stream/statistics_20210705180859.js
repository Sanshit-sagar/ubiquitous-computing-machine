import redis from '../../../lib/redis'
import { getSession } from 'next-auth/client'


export default async function handler(req, res) {
    const session = await getSession({ req })

    if (session) {
        const email = session.user.email

        var timeseries = [];
        var headers = [];
        var freqs = {}; 
        var count = 0;
        var skipped = 0; 

        try {
            const clickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1);

            console.log(`GOT THE DATA! ${clickstream}`)

            clickstream.forEach((click) => {
                const details = JSON.parse(click)
                
                if(details.timestamp || details.misc && details.misc?.finalTimestamp) {
                    let date = new Date(parseInt(details.timestamp)) 
                    let datestr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    
                    let currFreq = 1
                    if(freqs[datestr]) {
                        currFreq = freqs[datestr] + 1
                    } 
                    freqs[datestr] = currFreq

                    timeseries.push({
                        x: details.timestamp || details.misc?.finalTimestamp,
                        y: count,
                    }); 
                    headers.push(details)
                } else {
                    skipped++; 
                }
                count++;
            }); 
            
            let average = count===1 ? timeseries[0].x : count===0 ? 0 : -1 * (timeseries[count -skipped - 1].x - timeseries[0].x)/(count - skipped)
            res.status(200).json({ timeseries, headers, skipped, count, average })
        } catch (error) {
            // TODO: return howmuch ever was streamed up until that point 
            console.log(error.message)
            console.log(`Iteration ended at counter: ${count}`)
            res.status(500).json({ error: "unable to fetch data" })
        }
    } else {
        res.status(401).json({ error: 'Unauthenticated request'})
    }
    res.end()
}