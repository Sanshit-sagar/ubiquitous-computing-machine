import axios from 'axios'
import { DateTime, Interval } from 'luxon'

const baseUrl = `https://analyticly.hashably.workers.dev`
const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

function createLabelsAndFreqs(clicks) {
    let labels = [];
    let freqs = {};
    let total = 0; 
    let minDate = new Date(new Date().getTime() + DAY_IN_MILLIS * 7); // init min date to 1 week in the future
    let maxDate = new Date(new Date().getTime() - DAY_IN_MILLIS * 7);

    if(clicks?.length) {
        clicks.map(function (value, index) {
            let date = DateTime.fromMillis(parseInt(value.timestamp)).toLocaleString();
            minDate = Math.min(minDate, parseInt(value.timestamp));
            maxDate = Math.max(maxDate, parseInt(value.timestamp));

            if(freqs[date]) {
                freqs[date] += 1;
            } else {
                freqs[date] = 1; 
                labels.push({ date });
            }
            ++total; 
        });
    }

    return { labels, freqs, total, minDate, maxDate }; 
}

const makeInterval = (startDate, endDate) => {
    return Interval
        .fromDateTimes(startDate, endDate)
        .splitBy({ days: 1 })
        .map((d) => new DateTime(d.start).toLocaleString()); 
}

function createWeeklyInterval(start, now, end) {
    let nowDT = DateTime.fromMillis(now)
    let weekFromNowDT = DateTime.fromMillis(now + DAY_IN_MILLIS*7)
    let pastWeek = makeInterval(nowDT, weekFromNowDT);

    start = Math.min(start, nowDT);
    end = Math.max(end, weekFromNowDT);
    
    return { now, interval: pastWeek }
}

// todo: check if slug doesn't belong to anyone via local cache
async function handler(req, res) {
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
            let { labels, freqs, total, minDate, maxDate } = createLabelsAndFreqs(clicks)
            let { now, interval } = createWeeklyInterval(minDate, Date.now(), maxDate)

            res.status(200).json({ clicks, labels, freqs, interval, total, now, minDate });
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` });
        });
    } 
}

export default handler