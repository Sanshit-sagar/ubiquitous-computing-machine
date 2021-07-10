import React from 'react'

import { useSession } from 'next-auth/client'
import { Card } from '@supabase/ui'
import useSWR from 'swr'

import Loader from '../components/Loader'
import LineChart from '../components/Charts/LineChart'
import StackedLayout from '../sections/StackedLayout'

// function useUserClickstreams(email, time)  {
//     time = time || '30'
//     const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

//     return {
//         clickstream: data ? data.clickstream : [],
//         clickstreamLoading: !data && !err,
//         clickstreamError: err
//     };
// }

// const options = [
//     {
//         key: 'hourly',
//         label: 'Hourly',
//         value: 60,
//     },
//     {
//         key: '4Hourly',
//         label: '4 Hourly',
//         value: 60*4,
//     },
//     {
//         key: 'daily',
//         label: 'Daily',
//         value: 60*24,
//     },
// ];

// const OptionsBar = ({ selected, handleSelect }) => {
//     return (
//         <div className="flex-shrink-0 m-2">
//             <div className="w-full inline-flex justify-end align-stretch">
//                 {options.map(function(option, index) {
//                     return (
//                         <span key={index}>
//                             <Pill 
//                                 selected={selected===option.key} 
//                                 handleSelect={() => handleSelect(option.key)} 
//                                 withoutBorder={false} 
//                                 label={option.label} 
//                                 key={option.key}
//                             />
//                         </span>
//                     );
//                 })}
//             </div>
//         </div> 
//     )
// }

export function useHourlyClickstream(email) {
    const { data, error } = useSWR(`/api/stream/clickstream/hourly?email=${email}`)

    if(error) {
        return <p> `{`Error: ${error.message}`}` </p>
    }

    return {
        statistics: data ? { 
            skipped: data.average || 'n/a',
            count: data.count || 'n/a',
            average:  data.average || 'n/a',
            max: data.count || 'n/a',
            minTime: data.minTime || 'n/a',
            maxTime: data.maxTime || 'n/a',
            timespan: data.timespan || 0,
        } : { 
            skipped: 'n/a', 
            count: 'n/a', 
            average: 'n/a', 
            max: 'n/a', 
            minTime: 'n/a', 
            maxTime: 'n/a', 
            timespan: 'n/a' 
        }, 
        timeseries: data ? data.timeseries : [], // daily timeseries
        cummulative: data ? data.cummulative : [], // hourly timeseries
        frequencies: data ? data.freqs : [], // hourly frequencies
        loading: !data && !error,
        error
    };   
}

const VisualizationCharts = ({ email }) => {
    const { statistics, timeseries, cummulative, frequencies, loading, error } = useHourlyClickstream(email);

    return (
        <Card>
           {    
                    loading ? <Loader /> 
                :   error   ? <p> {`Error: ${error.message}`} </p> 
                :   <LineChart data={cummulative} title="Aggregated views with intervals during non-active periods" /> 
            }
        </Card>
    );
}

const Visualizer = ({ meta }) => {
    // const [session] = useSession()
    const email = 'sasagar@ucsd.edu'

    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <VisualizationCharts email={email} />
                    // email={session.user.email} 
                // />
            }
        /> 
    );
}

Visualizer.auth = false; 

Visualizer.defaultProps = {
    meta: {
        title: 'Visualizer',
        description: 'Visualizes key metrics'
    }
}

export default Visualizer