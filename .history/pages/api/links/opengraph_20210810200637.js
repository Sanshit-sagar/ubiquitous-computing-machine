const extract = require('meta-extractor');
import { formatOpenGraphData } from '../../../lib/utils'

function extractOpenGraphData(url) {
    return new Promise(function(resolve, reject) {
        extract({ uri: `${url}` }, function(err, res) {
            
            if(err && !res) {
                reject(`Error: ${err.message}`);
            } else if(!err && !res) {
                reject(`Error: No results found}}`);
            } else if(err && res) {
                reject(`Got response: ${res} and error: ${err.message}`);
            } else {
                resolve(res);
            }
            return; 
        });
})}


export default async function handler(req, res) {
    let { url } = req.query;

    if(!url) {
        console.log(`Didn't find a url`);
        res.status(403).json({ 'Error': `Invalid URL`});
    } else {
        extractOpenGraphData(url)
        .then((result) => {
            console.log(result)
            let openGraphData = formatOpenGraphData(result)
            res.status(200).json({ openGraphData });
        })
        .catch((reason) => {
            console.log(reason)
            res.status(500).json({ 'Error': reason });
        }); 
    }
}

    
