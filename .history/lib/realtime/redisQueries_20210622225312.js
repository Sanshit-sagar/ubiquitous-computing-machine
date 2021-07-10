import redis from '../../lib/redis'
import getChronologicalIndicies from './chrono'

export function addPropertyToKey(key, property, value) {
    if(!key || !key.length || !property || !property.length || !value || !value.length) {
        return '' 
    }
    return `${key}.${property}.${value}`
}

export async function updateGlobalRecords(indicies) {
    if(!indicies) {
        return { error: 'invalid params'};
    }

    const { dayIndex, weekIndex, monthIndex } = indicies

    const clickstream_global = `clickstream.global`
    const clickstream_global_day = `clickstream.global.${dayIndex}`
    const clickstream_global_week = `clickstream.global.${weekIndex}`
    const clickstream_global_month = `clickstream.global.${monthIndex}`

    return { clickstream_global, clickstream_global_day, clickstream_global_week, clickstream_global_month }
}

export async function updateUserClickstream(userId, indicies) {
    if(!userId || !indicies) {
        return { error: 'invalid params'};
    }

    const { dayIndex, weekIndex, monthIndex } = indicies

    const clickstream_user = `clickstream.user.${userId}`
    const clickstream_user_day = `clickstream.user.${userId}.day.${dayIndex}`
    const clickstream_user_week = `clickstream.user.${userId}.week.${weekIndex}`
    const clickstream_user_month = `clickstream.user.${userId}.month.${monthIndex}`

    return { clickstream_user, clickstream_user_day, clickstream_user_week, clickstream_user_month };
}

export async function updatePageClickstream(pageId, indicies) {
    if(!pageId || !indicies) {
        return { error: 'invalid params'};
    }
    
    const { dayIndex, weekIndex, monthIndex } = indicies

    const clickstream_page = `clickstream.page.${pageId}`
    const clickstream_page_day = `clickstream.page.${pageId}.day.${dayIndex}`
    const clickstream_page_week = `clickstream.page.${pageId}.week.${weekIndex}`
    const clickstream_page_month = `clickstream.page.${pageId}.month.${monthIndex}`
    
    return { clickstream_page, clickstream_page_day, clickstream_page_week, clickstream_page_month };
}

export async function postPageview(userId, pageId, pageViewData) {
    console.log('HEEEREEE!')
    
    if(!userId || !pageId || !pageViewData) {
        console.log('error!')
        return { error: 'invalid params'};
    }
   
    const data = JSON.stringify(pageViewData)
    var indicies = getChronologicalIndicies();

    console.log('Got indicies')

    const { clickstream_global, clickstream_global_day, clickstream_global_week, clickstream_global_month } = await updateGlobalRecords(indicies)
    const { clickstream_page, clickstream_page_day, clickstream_page_week, clickstream_page_month } = await updatePageClickstream(pageId, indicies);
    const { clickstream_user, clickstream_user_day, clickstream_user_week, clickstream_user_month } = await updateUserClickstream(userId, indicies);
    console.log('Got all channels, about to pipeline')
    
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
    pipeline.exec((err, results) => {
        responseObj['results'] = results
        console.log(results)
    });

    console.log('Done. Returning...'); 
    return responseObj;
}

export default function getAllKeys(userId, pageId) {
    if(!userId || !pageId) {
        return null; 
    }
    var indicies = getChronologicalIndicies();

    const globalClickstreams = updateGlobalRecords(indicies)
    const pageClickstreams = updatePageClickstream(pageId, indicies);
    const userClickstreams = updateUserClickstream(userId, indicies);
    
    
    return { 
        globalClickstreams,
        pageClickstreams,
        userClickstreams
    };
}
