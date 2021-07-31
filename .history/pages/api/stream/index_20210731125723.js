
import redis from '../../../lib/redis'
import { updateGlobalRecords, updatePageClickstream, updateUserClickstream } from '../../../lib/realtime/redisQueries'
import formatRequests from '../../../lib/realtime/formatRequests'
import getChronologicalIndicies from '../../../lib/realtime/chrono'

export default async function handler(req, res) {
  
        const pageViewData = formatRequests(req)
        const slug = pageViewData.slug
        const userId = pageViewData.owner
        const pageId = pageViewData.key
        const visitor = pageViewData.visitor
        const destination = pageViewData.destination
        const indicies = getChronologicalIndicies();
        const data = JSON.stringify(pageViewData)

        console.log(`Page View Data: ${data}`)
        console.log(`user: ${userId}, page: ${pageId}, indicies: ${JSON.stringify(indicies)}`)

        const { dayIndex, weekIndex, monthIndex } = indicies

        const { 
            clickstream_global, 
            clickstream_global_day, 
            clickstream_global_week, 
            clickstream_global_month 
        } = await updateGlobalRecords(indicies)
        
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
        

        var responseObj = {};
        const pipeline = await redis.pipeline();
        pipeline.lpush(clickstream_page, data);
        pipeline.lpush(clickstream_page_day, data);
        pipeline.lpush(clickstream_page_week, data);
        pipeline.lpush(clickstream_page_month, data);
        pipeline.lpush(clickstream_user, data);
        pipeline.lpush(clickstream_user_day, data);
        pipeline.lpush(clickstream_user_week, data);
        pipeline.lpush(clickstream_user_month, data);
        pipeline.lpush(clickstream_global, data);
        pipeline.lpush(clickstream_global_day, data);
        pipeline.lpush(clickstream_global_week, data);
        pipeline.lpush(clickstream_global_month, data);
        pipeline.sadd(`page.${dayIndex}.${slug}.visits`, `${visitor.ip}`);
        pipeline.sadd(`user.${dayIndex}.${userId}.visits`,`${visitor.ip}`);
        pipeline.sadd(`page.${slug}.visits`,`${visitor.ip}`);
        pipeline.sadd(`user.${userId}.visits`,`${visitor.ip}`);
        pipeline.zincrby(`page.${slug}.pageviews`, 1,`${slug}`);
        pipeline.zincrby(`user.${userId}.pageviews`, 1,`${slug}`);
        pipeline.zincrby(`user.${userId}.${dayIndex}.pageviews`, 1,`${slug}`);
        pipeline.exec((error, results) => {
            if(error) {
                res.status(500).json({ error: 'oh no!' })
            } else {
                console.log(`Wrote data successfully ${results}`)
                res.status(200).json({ message: 'success', results });
            }
        });
}


// const postResponse = await postPageview(userId, pageId, pageViewData)