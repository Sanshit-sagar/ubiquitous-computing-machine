import { getUnixIndexForDay, getUnixIndexForWeek, getUnixIndexForMonth } from '../../../lib/realtime/chrono'
import { updateGlobalRecords, updateUserClickstream, updatePageClickstream } from '../../../lib/realtime/redisQueries'

export default async function(req, res) {
    const { session } = await getSession({ req })

    if(session) {
        try {
            const indicies = getIndicies()
        
            const userId = session.user.email
            const pageId = `dangerous-cannons-fasten-bhnhg`

            var data = {
                'testField1': 'VALUE1',
                'testField2': 'VALUE2',
                'testField3': 'VALUE3'
            };
            
            const globalClickstreams = updateGlobalRecords(indicies, data)
            const userClickstream = updateUserClickstream(userId, indicies, data)
            const pageClickstream = updatePageClickstream(pageId, indicies, data)

            console.log('HERE!!')
            console.log(JSON.stringify(indicies))

            res.status(200).json({ globalClickstreams, userClickstream, pageClickstream, indicies })
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(500).json({ error: 'Unable to log values' });
        }
    } else {
        res.status(401).json({ error: 'Unauthenticated request' });
    }
    res.end();
}

function getIndicies() {
    const epoch = new Date().getTime()

    const dayIndex = getUnixIndexForDay(epoch)
    const weekIndex = getUnixIndexForWeek(epoch)
    const monthIndex = getUnixIndexForMonth(epoch)

    return { dayIndex, weekIndex, monthIndex }
}



