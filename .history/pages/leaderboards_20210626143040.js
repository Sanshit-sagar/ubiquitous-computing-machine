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
import DashboardGraphs from '../components/DashboardGraphs'

import aggregateStats from '../lib/statistics'

const LeaderboardTables = ({ email, time }) => {

    const {clickstream, loading, error} = useUserClickstreams(email, time) 

    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    let topCountries = aggregateStats(clickstream).sortedCountries.slice(0, 5)
    let topDestinations = aggregateStats(clickstream).sortedDestinations.slice(0, 5)
    let topIps = aggregateStats(clickstream).sortedIps.slice(0, 5)

    return (
        <p> {JSON.stringify(topDestinations)} </p>
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