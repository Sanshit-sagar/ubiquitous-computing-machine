import React, {useState, useContext, useMemo, useRef, useEffect} from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'
import axios from 'axios'

import { GlobalStore } from '../store'
import { fetchAndWait } from '@/lib/fetchWrapper'

import useDateTimeLocalizer from '../hooks/useDateTimeLocalizer'
import StackedLayout from '../sections/StackedLayout'
import Loader from '../components/Loader'
// import DashboardGraphs from '../components/DashboardGraphs'

import aggregateStats from '../lib/statistics'

const fetcher = url => axios.get(url).then(res => res.data)


function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const LeaderboardTables = ({ email, time }) => {

    const {clickstream, loading, error} = useUserClickstreams(email, time) 

    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    let leaderboards = {
     'topCountries': aggregateStats(clickstream).sortedCountries.slice(0, 5),
     'topDestinations': aggregateStats(clickstream).sortedDestinations.slice(0, 5),
     'topIps': aggregateStats(clickstream).sortedIps.slice(0, 5),
     'topUserAgents': aggregateStats(clickstream).sortedUserAgents.slice(0, 5)
    }

    return (
        <div className="container mx-auto bg-white  mt-5 p-2 m-2">
            {Object.entries(leaderboards).map(function(leaderboard, index) {
                return (
                    <span 
                        key={index}
                        className="text-black font-extralight"
                    >
                        {JSON.stringify(leaderboard[1])}
                    </span>
                )
            })}
        </div>
    )
}

const Leaderboards = () => {
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

export default Leaderboards