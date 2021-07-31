
const defaultData = { clicks: [] };

const setCache = (key, data) => CLICK_STREAM.put(key, data)
const getCache = key => CLICK_STREAM.get(key)
const listCache = () => CLICK_STREAM.list()

const getOwner = key => SLUG_OWNER.get(key)
const getDestination = key => SLUG_DESTINATION.get(key)
const getExpiry = key => SLUG_EXPIRY.get(key)
const getBlacklistEntry = (key) => BLACKLIST.get(key)

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

function getRequestHeaders(request) {
  let requestHeaders = Object.fromEntries(request.headers);
  return requestHeaders
}

async function isIpBlacklisted(incomingIp, requestedDestination) {
  let ipDestHash = `${incomingIp}->${requestedDestination}`;
  const asscBlacklistEntry = await getBlacklistEntry(ipDestHash);
  return asscBlacklistEntry;
}

async function updateClicks(request) {
  let data = {}; 

  const { pathname } = new URL(request.url);
  const sanitizedPathname = pathname.substring(8)

  var myKey;
  var destinationLink;
  var destinationExpiry; 

   if(!sanitizedPathname || !sanitizedPathname.length > 1) {
    return Response.redirect('https://http.cat/404')
  }
  else {
    myKey = await getOwner(sanitizedPathname)
    destinationLink = await getDestination(sanitizedPathname)
    destinationExpiry = await getExpiry(sanitizedPathname)
  }

  if(!destinationLink || !destinationLink.length || destinationLink==='N/A') {
    return Response.redirect('https://http.cat/404')
  }
  
  if(destinationExpiry && destinationExpiry?.length) {
    const doesExpire = destinationExpiry!=='n/a'
    if(doesExpire) {
      let expirationTimestamp = parseInt(destinationExpiry)
      let currentTimestamp = new Date().getTime().toString();
      
      if(expirationTimestamp < currentTimestamp){
        return new Response(`Sorry: your link expired at ${currentTimestamp}`, { status: 200 });
      } 
    }
  }
  
  let incomingIpAddress = `${request.headers.get('cf-connecting-ip')}`;
  let asscBlacklistEntry = await isIpBlacklisted(incomingIpAddress, request.url)
  if(asscBlacklistEntry) {
    return new Response(`Sorry: your IP was blacklisted by the owner of this site on ${asscBlacklistEntry}`, {
      status: 500
    });
  }

  try {
    const cache = await getCache(myKey)
    if(!cache) {
      data = defaultData;
    } else {
      data = JSON.parse(cache);
    }

    const clickId = data.clicks.length;
    const headers = getRequestHeaders(request)
    const rcf = request.cf

    data.clicks.push({
        id: clickId + 1,
        slug: `${pathname}`,
        request_headers: {
            host: request.headers['host'],
            ip: request.headers.get('cf-connecting-ip'), 
            system: request.headers.get('user-agent'),
            latitude: request.cf ? rcf.latitude : 'n/a',
            longitude:request.cf ? rcf.longitude : 'n/a',
            city: request.cf ? rcf.city : 'n/a',
            country: request.cf ? rcf.country : 'n/a',
            postalCode: request.cf ? rcf.postalCode : 'n/a',
            metroCode: request.cf ? rcf.metroCode : 'n/a',
            timezone: request.cf ? rcf.timezone : 'n/a',
        },
        owner: myKey,
        destination: destinationLink,
        timestamp: new Date().getTime().toString(),
      }); 
      await setCache(myKey, JSON.stringify(data))
      return Response.redirect(destinationLink, 301);
  } catch (error) {
      return new Response(error, { status: 500 });
  }
}

async function getClicks(request) {
  var clicks = []; 
  try {
    const { pathname } = new URL(request.url)
    const myKey = pathname.substring(5)

    if(!pathname || !myKey) {
      clicks = await listCache();
    } else {
      clicks = await getCache(myKey);
    }
    return new Response(clicks, { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 }); 
  }
}

function handleRequest(request) {
  const { pathname } = new URL(request.url)

  if(!pathname || !pathname.length) {
    return Response.redirect('https://http.cat/404')
  }

  if(pathname.startsWith('/api')) {
    return getClicks(request);
  } else {
    return updateClicks(request);
  }
}