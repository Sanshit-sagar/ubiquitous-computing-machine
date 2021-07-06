import React,{ useState, useEffect } from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../Loader'
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


// const EmptyGraph = () => {

//     return (
//         <div class="container mx-auto">
//             <h1> NO DATA 
//                 <a href="/new"> Create </a>
//             </h1>
//         </div>
//     )
// }


const TimeseriesVisualizers = ({ timeseriesLoading, timeseriesError }) => {

    return (
        
        <div className="grid grid-rows-3 grid-flow-col gap-4">
            {/* <div class="row-span-3">
                <TimeseriesList />
            </div> */}
            
            <div class="col-span-2">
                { timeseriesLoading   ? <Loader />  :   
                  timeseriesError     ? <h1> !Error!! </h1> :  
                  <StatisticsCards />
                }
            </div>

            {/* <div class="row-span-2 col-span-2">
                <ClickstreamTimeseries /> 
            </div> */}
        </div>


    )
}    

const TimeseriesWrapper = ({ email }) => {
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
        if(!loading && !error && clickstream && clickstream.length) {
            setTimeseriesLoading(true)
            
            const {details, timeseries, numUnique, numInvalid} = seriesGenerator(clickstream)
            setTimeseries([...timeseries])
            setDetails([...details]);
            updateStatistics(timeseries, numUnique, numInvalid); 
            setLastUpdatedAt(new Date().getTime().toString())

            setFetchCount(fetch + 1)
            setTimeseriesLoading(false)
        }
    }, [clickstream, timeseries, details, lastUpdatedAt])

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

const DashboardGraphs = ({ email }) => {

    return (
        <div className="container mx-auto h-full">
            {/* <TimeseriesWrapper email={email} /> */}
            <p> {`Recieved: ${email}`} </p>
        </div>
    );
}

export default DashboardGraphs
