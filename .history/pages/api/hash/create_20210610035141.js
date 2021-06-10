// import redis from '../../../lib/redis'
var randomstring = require("randomstring");

export default async function create(req, res) {

    try {
        var randomHash = randomstring.generate();

        var hashes = {
            random: randomHash
        }; 

        res.status(200).json({ hashes, message: 'Successfully create hash!' })
    } catch (error) {
        res.status(400).json({ message: 'Unable to generate a random hash. Try again' })
    }
}
