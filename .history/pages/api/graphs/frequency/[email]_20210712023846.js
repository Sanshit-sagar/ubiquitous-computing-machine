import redis from '../../../../lib/redis'

export default async function handler(req, res) {

    try {
        const { email } = req.query
        const clickstream = await redis.lrange(`clickstream.user.${email}`, 0 , -1); 

        let {freqs, freqsArr, cummFreqArr, scatterPlotArr, start, end} = getSortedFreqs(clickstream);

        res.status(200).json({ freqs, freqsArr, cummFreqArr, scatterPlotArr, start, end });
    } catch (error) {
        res.status(404).json({ error: `${error.message}` })
    }
}

function getSortedFreqs(clicks) {
    let freqs = {}; 
    let scatterPlotArr = []; 
    let windowStart = 0
    let windowEnd = 0

    clicks.forEach(function(value, index) {
        let click = JSON.parse(value);
        
        if(click.timestamp) {
            let datestr = new Date(parseInt(click.timestamp)).toLocaleDateString(); 
            let dateObj = new Date(parseInt(click.timestamp))
            
            let dayOfYear = getDayOfYear(parseInt(click.timestamp)); 
            console.log(dayOfYear); 
            let minsOfDay = dateObj.getHours()*60 + dateObj.getMinutes();
            let timeStr = dateObj.toLocaleTimeString(); 

            let currFreq = freqs[datestr] ?  freqs[datestr] + 1 : 1
            freqs[datestr] = currFreq

            scatterPlotArr.push({ 'x': datestr, 'y': minsOfDay, 'time': timeStr });
         
            windowStart = (windowStart===0) ? parseInt(click.timestamp) : Math.min(windowStart, parseInt(click.timestamp))
            windowEnd = (windowEnd===0) ? parseInt(click.timestamp) : Math.max(windowEnd, parseInt(click.timestamp))
        }  
    });

    scatterPlotArr.sort((a, b) => {
        if(a.x === b.x) {
            return parseInt(a.y) - parseInt(b.y);
        }
        return parseInt(new Date(a.x).toString()) - parseInt(new Date(b.x).toString())
    }); 

    let start = new Date(windowStart).toLocaleDateString();
    let end = new Date(windowEnd).toLocaleDateString();

    let idx = new Date(windowStart); 
    let endIdx = new Date(windowEnd);
    let freqsArr = [];
    let cummFreqArr = []; 

    let cummFreq = 0; 
    while(idx < endIdx) {
        let dateKey = new Date(idx).toLocaleDateString();
       

        if(!freqs[dateKey]) {
            freqs[dateKey] = 0;
            freqsArr.push({ 'x': dateKey, 'y': 0 });
        }  else {
            cummFreq += freqs[dateKey]
            freqsArr.push({ 'x': dateKey, 'y': freqs[dateKey] });
        }
        cummFreqArr.push({ 'x': dateKey, 'y': cummFreq }); 

        let newDate = idx.setDate(idx.getDate() + 1);
        idx = new Date(newDate);
    }

    return { freqs, freqsArr, scatterPlotArr, cummFreqArr, start, end }; 
}

function getDayOfYear(datetime) {
    var now = new Date(datetime);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var dayOfYear = Math.floor(diff / oneDay);
   
    return dayOfYear;
}