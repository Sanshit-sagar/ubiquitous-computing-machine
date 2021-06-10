
export default async function handler(req, res) {
    try {
        console.log(JSON.stringify(req))
        
        res.status(200).json({ 
            message: 'successfully printed headers '
        })
    } catch (err) {  
        res.status(400).json({ 
            message: 'failed to print headers '
        })
    }
}