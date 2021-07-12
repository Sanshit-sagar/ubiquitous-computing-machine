import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    const { email } = req.query

    try {
        var scoredUniques = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES')
        let uniques = [];

        scoredUniques.forEach(function(value, index) {
            if(index%2===0) {
                uniques.push({
                    slug: value,
                    views: scoredUniques[index + 1],
                });
            }
        });

        res.status(200).json({ scoredUniques });
    } catch (error) {
        res.status(401).json({ error });
    }
}