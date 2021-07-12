
export default async function handlers(req, res) {

    try {
        const { email, filter } = req.query
        let filteredData = []; 

        if(email && filter && email.length && filter.length) {
            if(filter==='mostViews') {
                filteredData = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES');
            } else if(filter==='Unique Views') {
                filteredData = await redis.smembers(`user.${email}.visits`);
            } else if(filter==='Total Views') {
                filteredData = await redis.lrange(`clickstream.user.${email}`, 0, -1);
            } else if(filter==='All Links') {
                filteredData = await redis.hgetall(`aliases::${email}`);
            }
            res.status(200).json({ filteredData });
        } else {
            res.status(401).json({ error: 'Incorrect parameters provided' });
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` });
    }
}