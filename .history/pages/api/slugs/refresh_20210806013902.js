
import redis from '../../../lib/redis';
const namor = require('namor');

export default async function handler(req, res) {

        const { email } = req.body;
        
        fetch(`https://analyticly.hashably.workers.dev/api/${email}`,  {
                method: 'GET',
        })
        .then((response) => {
            console.log(`${response}`); 
            res.status(200).json({ response });
        })
        .catch((error) => {
            console.log('error', error)
            res.status(500).json({ error });
        });
