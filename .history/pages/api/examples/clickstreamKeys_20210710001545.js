
import { updatePageClickstream, updateUserClickstream } from '../../../lib/realtime/redisQueries'
import getChronologicalIndicies from '../../../lib/realtime/chrono'

export default async function handler(req, res) {
    try {
        const { dayIndex, weekIndex, monthIndex } = getChronologicalIndicies();

        const { 
            clickstream_page, 
            clickstream_page_day, 
            clickstream_page_week, 
            clickstream_page_month 
        } = await updatePageClickstream(pageId, indicies);

        const { 
            clickstream_user, 
            clickstream_user_day, 
            clickstream_user_week, 
            clickstream_user_month 
        } = await updateUserClickstream(userId, indicies);

        res.status(200).json({ dayIndex, weekIndex, clickstream_page_day, clickstream_user_day });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }

}