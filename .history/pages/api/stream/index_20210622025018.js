
export default async function handler(req, res) {
    try {
        const ts = new Date().getUTCDate().toString(); 
        console.log(`Recieved request successfully @ ${ts}`)
        res.status(200).json({ message: 'SUCCESS'});
    } catch (error) {
        console.log( `Recieved error: ${error.message}`)
        res.status(404).json({ message: 'FAILURE' })
    }
}
    