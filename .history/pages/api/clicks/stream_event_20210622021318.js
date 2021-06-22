
export default async function handler(req, res) {
    try {
        console.log(`Recieved request: ${JSON.stringify(req)}`)
        res.status(200).json({ message: 'SUCCESS'});
    } catch (error) {
        console.log( `Recieved error: ${error.message}`)
        res.status(404).json({ message: 'FAILURE' }); 
    }
}
    