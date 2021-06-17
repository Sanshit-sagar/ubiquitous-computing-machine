import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        var response = {};
        const { slug } = req.query;        

        const destinationData = await redis.hget('aliases', slug)
        
        const user = 'sasagar@ucsd.edu'

        console.log(`Registering a click for ${slug} owned by ${user}`)

        let userViews = await redis.hincrby('user::views', user, 1)
        let slugViews = await redis.hincrby('views', slug, 1)

        console.log(`Updated views for slug ${slug}: ${slugViews}, and for user ${user}: ${userViews}`); 

        const pipeline = await redis.pipeline();
        pipeline.hincrby('views', slug, 1);
        pipeline.set(`indexed_slug_clickscores::${slug}`, destinationData);
        pipeline.set(`indexed_user_clickscores::${user}`, destinationData);
        pipeline.zadd(`slug_clickscores`, slugViews, destinationData);
        pipeline.zadd(`user_clickscores`, userViews, destinationData); 
        pipeline.exec((error, results) => {
            response = JSON.stringify(results)
            console.log(response)
        });

        const destination = `${destinationData.url}`;

        if(destination) {
            res.redirect(301, destination);
        } else {
            res.redirect(301, '/404');
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
