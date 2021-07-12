import redis from '../../../../lib/redis'

export default async function handler(req, res) {

    try {
        const { email } = req.query
        const clickstream = await redis.lrange(`clickstream.user.${email}`, 0 , -1); 

        let freqs = getSortedFreqs(clickstream);

        res.status(200).json({  })
    } catch (error) {
        res.status(404).json({ error: `${error.message}` })
    }
}

function getSortedFreqs(clicks) {

    clicks.forEach(function(value, index) {
        return (

        )
    })
}