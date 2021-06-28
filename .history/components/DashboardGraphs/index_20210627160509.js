import React,{ useState, useEffect } from 'react'

import toast from 'react-hot-toast'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../Loader'
import HeatedCalendar from '../Charts/HeatedCalendar'
import StatisticsCards from '../StatisticsCards'
import TimeseriesList from './TimeseriesList'
import ClickstreamTimeseries from './ClickstreamTimeseries'

export const fetcher = url => axios.get(url).then(res => res.data);

function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const EmptyGraph = () => {

    return (
        <div class="container mx-auto">
            <h1> NO DATA 
                <a href="/new"> Create </a>
            </h1>
        </div>
    )
}


const TimeseriesVisualizers = ({ timeseriesLoading, timeseriesError }) => {

    return (
        <div className="w-full h-full container mx-auto mt-3 inline-flex justify-between align-stretch">
            <div className="w-90 max-w-90 flex-col justify-between align-stretch">
                <TimeseriesList />
            </div>
            <div className="w-full h-full flex-col justify-start align-stretch ml-4 m-2">
                {
                        timeseriesLoading   ? <Loader /> 
                    :   timeseriesError     ? <h1> !Error!! </h1> 
                    :   <StatisticsCards />
                }   
                <ClickstreamTimeseries /> 
            </div>
        </div> 
    )
}    

const TimeseriesWrapper = ({ email, mounted, setMounted }) => {
    const [fetchCount, setFetchCount] = useState(0)
    const [lastUpdatedAt, setLastUpdatedAt] = useState('')

    const [details, setDetails] = useState([])
    const [timeseries, setTimeseries] = useState([])
    const [timeseriesLoading, setTimeseriesLoading] = useState(false)
    const [timeseriesError, setTimeseriesError] = useState(false)

    const [statistics, setStatistics] = useState({}) 
    const [timeFilter, setTimeFilter] = useState('30')

    const updateTimeFilter = (key) => {
        setTimeFilter(key)
    }

    const updateStatistics = (timeseries, uniqueCount, skipCount) => {
        setStatistics({
            ...statistics,
            size: timeseries.length,
            start: timeseries[0].x,
            end: timeseries[timeseries.length-1].x,
            numDays: (timeseries[0].x-timeseries[timeseries.length-1].x ) / (24*60*60),
            unique: uniqueCount,
            skipped: skipCount,
            avgTimePerPageview: (timeseries[0].x-timeseries[timeseries.length-1].x) / timeseries.length,
            latestPageview: timeseries[timeseries.length-1].x,
            earliestPageview: timeseries[0].x
        });
    }

    const { clickstream, loading, error } = useUserClickstreams(email, timeFilter)

    useEffect(() => {
        if(mounted && !loading && !error && clickstream && clickstream.length) {
            setTimeseriesLoading(true)
            
            const {details, timeseries, numUnique, numInvalid} = seriesGenerator(clickstream)
            setTimeseries([...timeseries])
            setDetails([...details]);
            updateStatistics(timeseries, numUnique, numInvalid); 
            setLastUpdatedAt(new Date().getTime().toString())
            
            setFetchCount(fetch + 1)
            setTimeseriesLoading(false)
        }
    }, [mounted, clickstream, timeseries, details, lastUpdatedAt])

    return (
        <TimeseriesVisualizers
            email={email} 
            timeseries={timeseries}
            setTimeseries={setTimeseries}
            timeseriesLoading={timeseriesLoading}
            timeseriesError={timeseriesError}
            timeFilter={timeFilter}
            updateTimeFilter={updateTimeFilter}
            statistics={statistics}
            details={details}
            lastUpdatedAt={lastUpdatedAt}
        />
    )
}

const DashboardGraphs = () => {
    const [mounted, setMounted] = useState(false)
    const [session, userLoading] = useSession()

    useEffect(() => {
        if(mounted) setMounted(true);
    }, [mounted]);

    const email = session && session.user ? session.user.email : ''

    return (
        <div className="container mx-auto h-full">
            <TimeseriesWrapper 
                email={email}
                mounted={mounted} 
            /> 
        </div>
    );
}

export default DashboardGraphs
