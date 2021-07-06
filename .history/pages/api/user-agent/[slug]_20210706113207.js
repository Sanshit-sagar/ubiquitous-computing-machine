var http = require('http');
var parser = require('ua-parser-js');

export default async function handler(req, res) {
    console.log('HELLO HELLO');
    
    try {
        const { useragent } = req.query

        if(useragent && useragent.length) {
            var ua = parser(useragent)
            res.status(200).json({ ua })
        } else {
            res.status(401).json({ error: 'Invalid user agent received' })
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` })
    }
}