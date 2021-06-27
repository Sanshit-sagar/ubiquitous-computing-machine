import React from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import aggregateStats from '../lib/statistics'

import Loader from '../components/Loader'
import LeaderboardTable from '../components/LeaderboardTable'
import StackedLayout from '../sections/StackedLayout'


// import { GlobalStore } from '../store'
// import { fetchAndWait } from '@/lib/fetchWrapper'
// import useDateTimeLocalizer from '../hooks/useDateTimeLocalizer'
// import { useRouter } from 'next/router'


const fetcher = url => axios.get(url).then(res => res.data)


function useClickstreamLeaderboards(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/statistics`, time] : null, fetcher)

    return {
        details: data ? data.details : [],
        loading: !data && !err,
        error: err
    };
}


const LeaderboardTables = ({ email, time }) => {

    const {details, loading, error} = useUserClickstreams(email, time) 

    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    // let leaderboards = [
    //  { id: 'topCountries', data: aggregateStats(clickstream).sortedCountries.slice(0, 5), title: 'Countries' },
    //  { id: 'topDestinations', data: aggregateStats(clickstream).sortedDestinations.slice(0, 5), title: 'Destinations'  },
    //  { id: 'topIps', data: aggregateStats(clickstream).sortedIps.slice(0, 5), title: 'IP Addresses' },
    //  { id: 'topUserAgents', data: aggregateStats(clickstream).sortedUserAgents.slice(0, 5), title: 'User Agents'  }
    // ];

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
                    {JSON.stringify(details)}
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