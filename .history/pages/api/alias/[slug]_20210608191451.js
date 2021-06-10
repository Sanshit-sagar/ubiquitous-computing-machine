
export default async function handler(req, res) {
    try {
        const { slug } = req.query 

        const reqHeaders = new Map(req)
        
        console.log({
            path: `${slug}`,
            ...reqHeaders
        })

        res.status(200).json({ 
            message: 'successfully printed headers '
        })
    } catch (err) {  
        res.status(400).json({ 
            message: 'failed to print headers ',
            cause: err.message
        })
    }
}