import React, { useState } from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'


function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


export function generateSortedList(column) {
    return Object.entries(column).sort((a, b) => column[b[0]] - column[a[0]])
}


function aggregateStats(clickstream, loading, error) {
    // const [session, sessionLoading] = useSession();

    const [noDataFound, setNoDataFound] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [statsError, setStatsError] = useState(null);
    // const [timeFilter, setTimeFilter] = useState('30');

    let ips = {}
    let countries = {}
    let destinations = {}
    let userAgents = {}

    let sortedCountries = [];
    let sortedDestinations = [];
    let sortedIps = [];

    let skipped = 0;
    let count = 0; 

    useEffect(() => {
        if(error) {
            setStatsError(true);
            setNoDataFound(!clickstream && !clickstream?.length);
            setCalculating(false)
        }
    }, [clickstream, loading, error]); 


    if(!loading && !error && clickstream?.length) {
        setCalculating(true)
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
        sortedCountries = generateSortedList(countries)
        sortedDestinations = generateSortedList(destinations)
        sortedIps = generateSortedList(ips)
        setCalculating(false)
    } else if(!clickstream?.length) {
        setNoDataFound(true)
        sortedCountries = [];
        sortedDestinations = [];
        sortedIps = [];
    }

    return { 
        sortedCountries: sortedCountries?.length || [], 
        sortedIps: sortedIps?.length || [], 
        sortedDestinations: sortedDestinations?.length || [], 
        userAgents, 
        skipped, 
        count,
        loading: loading || calculating,
        error,
        noData: noDataFound || error 
    };
}

 export default aggregateStats