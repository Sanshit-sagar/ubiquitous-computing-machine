import axios from 'axios'
import { DateTime, Interval } from 'luxon'

const baseUrl = `https://analyticly.hashably.workers.dev`
const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

function createLabelsAndFreqs(clicks) {
    let labels = [];
    let freqs = {};

    if(clicks?.length) {
        clicks.map(function (value, index) {
            let date = new Date(parseInt(value.timestamp)).toDateString();
            if(freqs[date]) {
                freqs[date] += 1;
            } else {
                freqs[date] = 1; 
                labels.push({ date });
            }
        })
    }

    return { labels, freqs }; 
}

const makeInterval = (startDate, endDate) => {
    return Interval
        .fromDateTimes(startDate, endDate)
        .splitBy({ days: 1 })
        .map((d) => new DateTime(d.start).toLocaleString()); 
}

function createWeeklyInterval(now) {
    let nowDT = DateTime.fromMillis(now)
    let weekFromNowDT = DateTime.fromMillis(now + DAY_IN_MILLIS*7)
    let pastWeek = makeInterval(nowDT, weekFromNowDT);
    return { now, interval: pastWeek }
}

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
        await axios.get(fetchUrl)
        .then((response) => {
            console.log(`Recieved a response! ${response}`)
            
            let clicks = [...response.data.clicks]
            let { labels, freqs } = createLabelsAndFreqs(clicks)
            let { now, interval } = createWeeklyInterval(Date.now())

            res.status(200).json({ clicks, labels, freqs, interval, now });
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` });
        });
    } 
}