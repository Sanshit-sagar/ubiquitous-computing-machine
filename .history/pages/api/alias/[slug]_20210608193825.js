
export default async function handler(req, res) {
    try {
        const { slug } = req.query 

        const headerMap = new Map(req.headers)
        const headersStr = ''

        Object.entries(headerMap).forEach(function(value, index, array) {
            headersStr += `header_name:${value}` + '\n';
        })

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