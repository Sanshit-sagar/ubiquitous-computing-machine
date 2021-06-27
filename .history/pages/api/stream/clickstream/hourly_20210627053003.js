
import redis from '../../../../lib/redis'
// import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
    // const session = getSession({ req })
    // let email = ''

    // if(!session) {
    //     res.status(500).json({ error: 'Unauthenticated' });
    // } else {
    //     email = session.user.email
    // }
    var timeseries = [];
    var freqs = {}
    var count = 0;
    var skipped = 0; 

    try {
        const rawClickstream = await redis.lrange(`clickstream.global`, 0, -1);
        const clickstream = rawClickstream.sort((a, b) => {
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
        })

        var max = Number.MIN_SAFE_INTEGER
        let minTime = 0
        let maxTime = 0

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
                
                timeseries.push({ x: hourlyStr, y: count });
            } else {
                skipped++; 
            }
            count++;
        }); 
       
        let timespan = (maxTime - minTime)/ (1000*60*60*24)
        let average = count<=1 ? 0 : -1 * timespan/(count-skipped)   
        res.status(200).json({ timeseries, skipped, count, freqs, average, max, minTime, maxTime, timespan })
    } catch (error) {
        console.log(`Iteration ended at counter: ${count} because: ${error.message}`)
        res.status(500).json({ error: `Encountered an error ${error.message}` })
    }
}