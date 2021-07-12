import redis from '../../../../lib/redis'

export default async function handler(req, res) {

    try {
        const { email } = req.query
        const clickstream = await redis.lrange(`clickstream.user.${email}`, 0 , -1); 

        let {freqs, start, end} = getSortedFreqs(clickstream);

        res.status(200).json({ freqs, start, end });
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

    var loop = new Date(start);
    while(loop <= end) {
        var currDateLocaleStr = new Date(loop).toLocaleDateString();
        if(!freqs[currDateLocaleStr]) {
            freqs[currDateLocaleStr] = 0;
        }
        var newDate = loop.setDate(loop.getDate() + 1); 
        loop = new Date(newDate);
    }

    return { freqs, start, end }; 
}