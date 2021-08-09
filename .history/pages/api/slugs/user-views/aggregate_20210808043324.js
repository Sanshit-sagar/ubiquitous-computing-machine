
import redis from '../../../../lib/redis'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
    const session = await getSession();

    if(!session) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {

        try {
            // todo: chain these in a pipeline
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1);
            var uniques = await redis.zmembers(`user.${email}.pageviews`);

            let clickstream = [];
            clickstreamRaw.map(function(value, index) {
                let click = JSON.parse(value);

                clickstream.push({
                    index,
                    click
                }); 
            });

            res.status(200).json({ uniques, clickstream })
        } catch(error) {
            res.status(500).json({ error: `${error.message}` })
        }
    } 
}