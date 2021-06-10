// import redis from '../../../lib/redis'
import cryptoRandomString from 'crypto-random-string';

export default async function create(req, res) {

    try {
        var randomHash = cryptoRandomString({length: 10});

        var hashObj = {
            random: randomHash
        }; 

        res.status(200).json({ hashObj })
    } catch (error) {
        res.status(400).json({ message: 'Unable to generate a random hash. Try again' })
    }
}
