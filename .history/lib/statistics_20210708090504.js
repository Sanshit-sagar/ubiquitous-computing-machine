
export function generateSortedList(column) {
    return Object.entries(column).sort((a, b) => column[b[0]] - column[a[0]])
}

function aggregateStats(clickstream) {
    let ips = {}
    let countries = {}
    let destinations = {}
    let userAgents = {}

    let skipped = 0;
    let count = 0; 

    clickstream.forEach(click => {
        const ip = click.visitor ? click.visitor.ip : click.user ? click.user.ip : ''
        const country = click.geodata ? click.geodata.country : click.geo ? click.geo.country : ''
        const destination = click.destination || ''
        const userAgent = click.visitor ? click.visitor.system : click.user ? click.user.system : click.system ? click.system : ''

        if(!ip.length || !country.length || !destination.length || !userAgent.length) {
            ++skipped
        } else {
            const ipFreq = ips[ip] || 0
            const countryFreq = countries[country] || 0 
            const destFreq = destinations[destination] || 0
            const userAgentFreq = userAgents[userAgent] || 0
            
            ips[ip] = ipFreq + 1
            countries[country] = countryFreq + 1
            destinations[destination] = destFreq + 1
            userAgents[userAgent] = userAgentFreq + 1
        }
        ++count
    });

    var sortedCountries = generateSortedList(countries)
    var sortedDestinations = generateSortedList(destinations)
    var sortedIps = generateSortedList(ips)

    return { sortedCountries, sortedIps, sortedDestinations, userAgents, skipped, count }
}

 export default aggregateStats