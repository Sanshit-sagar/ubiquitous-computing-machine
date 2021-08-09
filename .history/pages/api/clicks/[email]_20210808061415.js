import axios from 'axios'
var parser = require('ua-parser-js');

import { timeDifference } from '../../../lib/datetime'
import redis from '../../../lib/redis'

const baseUrl = `https://analyticly.hashably.workers.dev`

function formatUserAgent(useragent) {
    if(!useragent) return '';
    
    let ua = parser(useragent);
    return {
        'browser': ua.browser?.name || '-',
        'engine': ua.engine.name || '-',
        'os': ua.os.name || '-',
    };
}

function formatSlug(slug) {
    return (slug.startsWith('/hashed')) ? slug.substring(8) : slug.substring(1)
}

function formatCoordinatePoint(ptArr) {
    if(!ptArr?.length) return "-";

    return `${ptArr[0]}.${ptArr[1].substring(0,2)}`;
}

function formatCoordinate(longitude, latitude) {
    if(!longitude || !latitude) return "-";

    let xArr = latitude.split('.');
    let yArr = longitude.split('.');
    return `(${formatCoordinatePoint(xArr)}, ${formatCoordinatePoint(yArr)})`;
}

function formatLocation(city, postalCode, timezone) {
    return `${city}, ${postalCode} (${timezone})`;
}

function formatTimestamp(ts) {

    return { 
        'timeAgo': ts ? timeDifference(ts) : '-', 
        'localeTime': ts ? new Date(parseInt(ts)).toLocaleString() : '-'
    };
}

function formatAndSortClicks(clicks) {
    let data = [];

    clicks.map(function(value, index) {
        let headers = value.request_headers;
        let userAgent = formatUserAgent(headers.system);
        let datetime = formatTimestamp(value.timestamp)

        let fmtTs = `${datetime['localeTime']}`;
        let fmtSlug = `${formatSlug(value.slug)}`;
        let fmtDest = `${value.destination}`;
        let fmtLoc =  `${formatLocation(headers.city, headers.postalCode, headers.timezone)}`;
        let fmtGeo = `${formatCoordinate(headers.longitude, headers.latitude)}`;

        data.push({
            id: index + 1,
            slug: fmtSlug,
            destination: fmtDest,
            os: `${userAgent['os']}`,
            engine: `${userAgent['engine']}`,
            browser: `${userAgent['browser']}`,
            country: `${headers.country}`,
            location: fmtLoc,
            metroCode: `${headers.metroCode}`,
            geodata: fmtGeo,
            ipAddress: `${headers.ip}`,
            host: `${headers.host || '-'}`,
            tlsVersion: `${headers.tlsVersion}`,
            httpProtocol: `${headers.httpProtocol}`,
            timestamp: fmtTs,
            asn: `${headers.asn || '-'}`,
            tlsCipher: `${headers.tlsCipher || '-'}`,
            clientTcpRtt: `${headers.clientTcpRtt || '-'}`,
            clientAcceptEncoding: `${headers.clientAcceptEncoding || '-'}`
        });


        // Check if click and its stats are cached
        const isCached = await redis.hget(`cached.${fmtSlug}.${fmtDest}.${fmtTs}`, slug)
        if(isCached===null) {
            console.log(`${slug} has not been cached, caching it now...`);
            // zadd (ip, country, httpProtocol, engine, browser, os) for uniques, 
            // lpush timestamp for daily, weekly, monthly clickstreams
            // and add 
        }

    });

    data.sort((a,b) => b.id - a.id);
    return data; 
}


export default async function handler(req, res) {
    const { email } = req.query

    console.log(`Getting Clicks for user: ${email}`)

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        if(!email || email.length < 5) {
            res.status(401).json({ error: 'Bad Request. Invalid Email' })
        } else {
            const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
            
            await axios.get(fetchUrl).then((response) => {
                let data = formatAndSortClicks(response.data.clicks);
                res.status(200).json({ 'clicks': data })
            }).catch((error) => { 
                res.status(500).json({ error: `${error.message}` }) 
            });
        }
    }
}
    
// res.status(500).json({ error: `Unauthorized request` }); 