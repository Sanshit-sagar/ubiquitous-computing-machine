
export default async function handler(req, res) {
    try {
        const { slug } = req.query 

        const reqHeadersStr = JSON.stringify(Object.fromEntries(req.headers), null, 2)
        console.log(`Request Headers ${reqHeadersStr}`)

        res.status(200).json({ 
            message: 'successfully printed headers',
            value: reqHeadersStr
        })
    } catch (err) {  
        res.status(400).json({ 
            message: 'failed to print headers ',
            cause: err.message
        })
    }
}