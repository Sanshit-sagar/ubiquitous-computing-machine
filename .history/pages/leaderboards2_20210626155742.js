import React from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import aggregateStats from '../lib/statistics'

import Loader from '../components/Loader'
import LeaderboardTable from '../components/LeaderboardTable'
import StackedLayout from '../sections/StackedLayout'

const aggreateStats = (clickstream)


const fetcher = url => axios.get(url).then(res => res.data)


function useClickstreamLeaderboards(email)  {
    // const time = timeFilter || '30'
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
        { id: 'topCountries', data: aggregatedStats.countries.slice(0, 5), title: 'Countries' },
        // { id: 'topDestinations', data: aggregatedStats.destinations.slice(0, 5), title: 'Destinations'  },
        { id: 'topIps', data: aggregatedStats.ips.slice(0, 5), title: 'IP Addresses' },
        { id: 'topUserAgents', data: aggregatedStats.userAgents.slice(0, 5), title: 'User Agents'  },
        { id: 'topHttpProtocols', data: aggregatedStats.httpProtocols.slice(0,5), title: 'HTTP Protocols'}, 
        { id: 'topTlsVersions', data: aggregatedStats.tlsVersions.slice(0,5), title: 'TLS Versions'}
    ];

    return (
        <div className="container mx-auto mt-4 p-2">
            <div className="inline-flex flex-wrap justify-start align-center">
                {/* {Object.entries(leaderboards).map(function(leaderboard, index) {
                    return (
                        <div key={index} className="flex-col justify-start align-stretch m-1 p-2 rounded-md shadow">
                            <LeaderboardTable 
                                data={leaderboard[1].data} 
                                title={leaderboard[1].title}
                            />
                        </div>
                    )
                })} */}
                <span className="text-black font-extralight">
                    {JSON.stringify(data)}
                </span> 
            </div>
        </div>
    )
}

const LeaderboardsCollection = () => {
    const [session, sessionLoading] = useSession()

    const time = '30';
    const email = session && session.user ? session.user.email : ''

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