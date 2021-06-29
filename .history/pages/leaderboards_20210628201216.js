import React from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import aggregateStats from '../lib/statistics'

import Loader from '../components/Loader'
import LeaderboardTable from '../components/LeaderboardTable'
import StackedLayout from '../sections/StackedLayout'
import AccessDenied from '../components/AccessDenied'

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email, time)  {
    time = time || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        clickstreamLoading: !data && !err,
        clickstreamError: err
    };
}

const LeaderboardTables = ({ email, time, loading }) => {
    const {clickstream, clickstreamLoading, clickstreamError} = useUserClickstreams(email, time) 

    if(!loading && !email || clickstreamError) return <AccessDenied /> 

    let aggreatedStats = clickstream && clickstream.length ? aggregateStats(clickstream) : {}
    let leaderboards = [
     { id: 'topCountries', data: aggreatedStats.sortedCountries.slice(0, 5), title: 'Countries' },
     { id: 'topDestinations', data: aggreatedStats.sortedDestinations.slice(0, 5), title: 'Destinations'  },
     { id: 'topIps', data: aggreatedStats.sortedIps.slice(0, 5), title: 'IP Addresses' },
     { id: 'topUserAgents', data: aggreatedStats.sortedUserAgents.slice(0, 5), title: 'User Agents'  }
    ];

    return (
        <div className="container mx-auto mt-4 p-2">
            <div className="inline-flex flex-wrap justify-start align-center">
                {Object.entries(leaderboards).map(function(leaderboard, index) {
                    return (
                        <div key={index} className="flex-col justify-start align-stretch m-1 p-2 rounded-md shadow">
                            { clickstreamLoading || loading ?
                                <Loader /> : 
                                <LeaderboardTable 
                                    data={leaderboard[1].data} 
                                    title={leaderboard[1].title}
                                />
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Leaderboards = () => {
    const [session, loading] = useSession()
    const [time, setTime] = useState('30')

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
                    loading={loading}
                />
            }
        /> 
    );
}

export default Leaderboards