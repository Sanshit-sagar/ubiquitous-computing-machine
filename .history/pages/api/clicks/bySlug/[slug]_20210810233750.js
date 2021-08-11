import axios from 'axios'
import { DateTime, Interval } from 'luxon'

const baseUrl = `https://analyticly.hashably.workers.dev`


const makeInterval = (startDate, endDate) => {
    return Interval.fromDateTimes(startDate, endDate).splitBy({ days: 1 }).map((d) => d.start);
}

const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

// todo: check if slug doesn't belong to anyone via local cache
export default async function handler(req, res) {
    const { slug } = req.query

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        let fetchUrl = '';
        if(!slug?.length || slug.length < 5 || slug.length > 30) {
            fetchUrl = `${baseUrl}/api/slug/all`;
        } else {
            fetchUrl = `${baseUrl}/api/slug/${slug}`;
        }

        console.log(`About to fetch from ${fetchUrl}`)
        await axios.get(fetchUrl).then((response) => {
            console.log(`Recieved a response! ${response}`)
            
            let labels = [];
            let freqs = {};
            response.data.clicks.map(function (value, index) {
                let date = new Date(parseInt(value.timestamp)).toDateString();
                if(freqs[date]) {
                     freqs[date] += 1;
                } else {
                    freqs[date] = 1; 
                    labels.push({ date });
                }
            })

            let now = Date.now();

            res.status(200).json({ 
                clicks: response.data.clicks, 
                labels, 
                freqs,
                interval: makeInterval(DateTime.fromMillis(now), DateTime.fromMillis(now + DAY_IN_MILLIS*7))
            })
        }).catch((error) => { 
            res.status(500).json({ 
                error: `${error.message}` 
            }) 
        });
    } 
}