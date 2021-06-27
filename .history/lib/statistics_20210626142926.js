
function generateSortedList(column) {
    return Object.entries(column).sort((a, b) => column[a[1]] - column[b[1]]);
}

function aggregateStats(clickstream) {
    let ips = {}
    let countries = {}
    let destinations = {}
    let skipped = 0;
    let count = 0; 

    clickstream.forEach(click => {
        const ip = click.visitor ? click.visitor.ip : click.user ? click.user.ip : ''
        const country = click.geodata ? click.geodata.country : click.geo ? click.geo.country : ''
        const destination = visitor.destination || ''
        const userAgent = click.visitor ? click.visitor.system : click.user ? click.user.system : click.system ? click.system : ''

        if(!ip.length || !country.length || !destination.length) {
            ++skipped
        } else {
            const ipFreq = ips[ip] || 0
            const countryFreq = countries[country] || 0 
            const destFreq = destinations[destination] || 0
            
            ips[ip] = ipFreq + 1
            countries[country] = countryFreq + 1
            destinations[destination] = destFreq + 1
        }
        ++count
    });
    // var sortedCountries = Object.entries(countries).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 
    // var sortedDestinations = Object.entries(destinations).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 
    // var sortedIps = Object.entries(ips).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 

    var sortedCountries = generateSortedList(countries)
    var sortedDestinations = generateSortedList(destinations)
    var sortedIps = generateSortedList(ips)

    return { sortedCountries, sortedIps, sortedDestinations, skipped, count }
}

 export default aggregateStats