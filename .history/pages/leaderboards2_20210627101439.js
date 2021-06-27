import React from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../components/Loader'
import LeaderboardTable from '../components/LeaderboardTable'
import StackedLayout from '../sections/StackedLayout'

function generateSortedList(freqs) {
    const sortedColumn = Object.entries(freqs).sort((a,b) => freqs[b[0]] - freqs[a[0]]);
    return sortedColumn
}

const aggregateStats = (data) => {
    let ips = {}
    let countries = {}
    let userAgents = {}
    let hosts = {}
    let tlsVersions = {}
    let httpProtocols = {}

    let skipped = 0;
    let count = 0; 

    data.forEach(click => {
        const ip = click.ipAddress
        const country = click.country
        const userAgent = click.userAgent
        const host = click.host
        const tlsVersion = click.tlsVersion
        const httpProtocol = click.httpProtocol

        if(!ip.length || !country.length || !userAgent.length) {
            ++skipped
        } else {
            const ipFreq = ips[ip] || 0
            const countryFreq = countries[country] || 0 
            const userAgentFreq = userAgents[userAgent] || 0
            const hostFreq = hosts[host] || 0
            const tlsVersionFreq = tlsVersions[tlsVersion] || 0
            const httpProtocolFreq = httpProtocols[httpProtocol] || 0
            
            ips[ip] = ipFreq + 1
            countries[country] = countryFreq + 1
            userAgents[userAgent] = userAgentFreq + 1
            hosts[host] = hostFreq + 1
            tlsVersions[tlsVersion] = tlsVersionFreq + 1
            httpProtocols[httpProtocol] = httpProtocolFreq + 1 
        }
        ++count
    });
    var sortedCountries = generateSortedList(countries)
    var sortedHosts = generateSortedList(hosts)
    var sortedIps = generateSortedList(ips)
    var sortedUserAgents = generateSortedList(userAgents)
    var sortedHttpProtocols = generateSortedList(httpProtocols)
    var sortedTlsVersions = generateSortedList(tlsVersions)

    return { 
        'countries': sortedCountries, 
        'ips': sortedIps, 
        'hosts': sortedHosts,
        'userAgents': sortedUserAgents, 
        'httpProtocols': sortedHttpProtocols,
        'tlsVersions': sortedTlsVersions,
        skipped, 
        count 
    }
}


const fetcher = url => axios.get(url).then(res => res.data)


function useClickstreamLeaderboards(email)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/statistics` : null, fetcher)

    return {
        data: data ? data.headers : {},
        loading: !data && !err,
        error: err
    };
}


const LeaderboardTables = ({ email, time }) => {

    const {data, loading, error} = useClickstreamLeaderboards(email) 

    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    let aggregatedStats = aggregateStats(data)

    let leaderboards = [
        // { id: 'topCountries', data: aggregatedStats.countries.slice(0, 5), title: 'Countries' },
        { id: 'topUserAgents', data: aggregatedStats.userAgents.slice(0, 5), title: 'User Agents'  },
        { id: 'topHttpProtocols', data: aggregatedStats.httpProtocols.slice(0,5), title: 'HTTP Protocols'}, 
        { id: 'topTlsVersions', data: aggregatedStats.tlsVersions.slice(0,5), title: 'TLS Versions'},
    ];

    let barCharts = [
        { id: 'topIps', data: aggregatedStats.ips.slice(0, 5), title: 'IP Addresses' },
        { id: 'topHosts', data: aggregatedStats.hosts.slice(0, 5), title: 'Hosts' }, 
    ]

    return (
        <div className="w-full-screen container mx-auto mt-4 p-2">
            <div className="inline-flex justify-start align-stretch">
                {Object.entries(leaderboards).map(function(pieChartData, index) {
                    return (
                        <div key={index} className="flex justify-start align-stretch m-1 p-2 rounded-md shadow">
                            <LeaderboardTable 
                                data={pieChartData[1].data} 
                                title={pieChartData[1].title}
                                type="pie"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="inline-flex flex-wrap justify-start align-center">
                {Object.entries(barCharts).map(function(barChartTable, index) {
                    return (
                        <div key={index} className="flex justify-start align-stretch m-1 p-2 rounded-md shadow">
                            {/* <LeaderboardTable
                                data={barChartTable[1].data}
                                title={barChartTable[1].title}
                                type="bar"
                            />  */}
                            <p> {barChartTable[1].type} </p>
                        </div>
                    )
                })}
            </div> 

        </div>
    )
}

const LeaderboardsCollection = () => {
    const [session, sessionLoading] = useSession()

    const time = '30';
    const email = session && session.user ? session.user.email : ''; 

    return (
        <StackedLayout
            pageMeta={{
                title: 'Leaderboards',
                description: 'yadiddads'
            }}
            children={
                <LeaderboardTables
                    time={time}
                    email={email} 
                />
            }
        /> 
    );
}

export default LeaderboardsCollection