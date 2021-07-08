var parser = require('ua-parser-js');

export default async function(req, res) {

    try {
        const { email, userAgents } = req.query

        const userAgentsArr = userAgents.split(','); 

        var opsystems = {}
        var browsers = {}
        var engines = {}
        
        userAgentsArr.forEach(function(value, index) {
            let ua = parser(value)
            
            var browser = ua.browser.name
            var os = ua.os.name
            var engine = ua.engine.name
            
            if(opsystems[os]) {
                opsystems[os] += 1
            } else {
                opsystems[os] = 1
            }

            if(engines[engine]) {
                engines[engine] += 1
            } else {
                engines[engine] = 1
            }

            if(browsers[browser]) {
                browsers[browser] += 1
            } else {
                browsers[browser] = 1
            }        
        }); 

        let sua = {
            sortedOsNames: opsystems,
            sortedBrowsers: browsers,
            sortedEngines: engines,
        }

        // console.log(JSON.stringify(sua))
        res.status(200).json({ sua })

    } catch (error) {

        console.log(`Error! ${error.message}`)
        res.status(401).json({ error: 'Invalid params'})
    }
}