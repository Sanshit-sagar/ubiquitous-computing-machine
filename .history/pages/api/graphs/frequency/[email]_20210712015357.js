import redis from '../../../../lib/redis'

export default async function handler(req, res) {

    try {
        const { email } = req.query
        const clickstream = await redis.lrange(`clickstream.user.${email}`, 0 , -1); 

        let {freqs, freqsArr, start, end} = getSortedFreqs(clickstream);

        res.status(200).json({ freqs, freqsArr, start, end });
    } catch (error) {
        res.status(404).json({ error: `${error.message}` })
    }
}

function getSortedFreqs(clicks) {
    let freqs = {}; 
    let windowStart = 0
    let windowEnd = 0

    clicks.forEach(function(value, index) {
        let click = JSON.parse(value);

        if(click.timestamp) {
            let datestr = new Date(parseInt(click.timestamp)).toLocaleDateString(); 
            let currFreq = freqs[datestr] ?  freqs[datestr] + 1 : 1
            freqs[datestr] = currFreq
         
            windowStart = (windowStart===0) ? parseInt(click.timestamp) : Math.min(windowStart, parseInt(click.timestamp))
            windowEnd = (windowEnd===0) ? parseInt(click.timestamp) : Math.max(windowEnd, parseInt(click.timestamp))
        }  
    });

    let start = new Date(windowStart).toLocaleDateString();
    let end = new Date(windowEnd).toLocaleDateString();

    let idx = new Date(windowStart); 
    let endIdx = new Date(windowEnd);
    let freqsArr = [];
    while(idx < endIdx) {
        let dateKey = new Date(idx).toLocaleDateString();
        if(!freqs[dateKey]) {
            freqsArr.push({ 'x': dateKey, 'y': 0});
        }  else {
            freqsArr.push({ 'x': dateKey, 'y': `${freqs[dateKey]}` });
        }

        let newDate = idx.setDate(idx.getDate() + 1);
        idx = new Date(newDate);
    }

    return { freqs, freqsArr, start, end }; 
}