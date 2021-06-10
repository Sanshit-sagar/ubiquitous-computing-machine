
export default async function handler(req, res) {
    console.log(JSON.stringify(req))

    try {
        res.status(200).json({ 
            message: 'successfully printed headers '
        })
    } catch (err) {  
        res.status(400).json({ 
            message: 'failed to print headers '
        })
    }
}