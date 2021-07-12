
export default async function handlers(req, res) {

    try {
        const { email, filter } = req.query
        let filteredData = []; 

        if(email && filter && email.length && filter.length) {
            if(filter==='Most Views') {
                filteredData = await redis.smembers(`page.${dayIndex}.${slug}.visits`) 
            } else if(filter==='Unique Views') {
                filteredData = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES');
            }
        } else {
            res.status(401).json({ error: 'Incorrect parameters provided' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data' });
    }
}