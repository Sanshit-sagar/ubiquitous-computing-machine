const formatRequests = (req) => {
    const key = req.body.cacheKey
    const slug = req.body.pathname
    const owner = req.body.owner
    const destination = req.body.destination
    const headers = req.headers
    const body = req.body
    

    const visitor = {
        host: req.headers['host'] || '',
        ip: req.headers['cf-connecting-ip'] || '',
        realIp: req.body.headers['x-real-ip'] || '',
        forwardedFor: req.headers['x-forwarded-for'] || '',
        system: req.body.headers['user-agent'] || ''
    };

    const geodata = {
        latitude: req.body.cloudflare.latitude,
        longitude: req.body.cloudflare.longitude,
        city: req.body.cloudflare.city ,
        country: req.body.cloudflare.country,
        region: req.body.cloudflare.region,
        postalCode: req.body.cloudflare.postalCode,
        metroCode: req.body.cloudflare.metroCode,
        regionCode: req.body.cloudflare.regionCode,
        timezone: req.body.cloudflare.timezone,
        colo: req.body.cloudflare.colo,
    };

    const timestamp = new Date().getTime().toString()
    const misc = {
        initTimestamp: req.body.timestamp,
        finalTimestamp: timestamp,
        timeTaken: parseInt(timestamp) - parseInt(req.body.timestamp)
    };

    var logEntry = {
        key,
        slug,
        owner,
        destination,
        visitor,
        geodata,
        misc,
        timestamp
    };

    return logEntry
}

export default formatRequests