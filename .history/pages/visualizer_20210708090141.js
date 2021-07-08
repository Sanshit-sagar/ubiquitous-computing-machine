import React from 'react'

import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'
import { Card } from '@supabase/ui'

import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

import LineChart from '../components/Charts/LineChart'

// const fetcher = url => axios.get(url).then(res => res.data)

// function useUserClickstreams(email, time)  {
//     time = time || '30'
//     const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

//     return {
//         clickstream: data ? data.clickstream : [],
//         clickstreamLoading: !data && !err,
//         clickstreamError: err
//     };
// }

export function useHourlyClickstream(email) {
    const { data, error } = useSWR('/api/stream/clickstream/hourly?email=${email}')

    if(error) {
        return (
            <p> `{`Error: ${error.message}`}` </p>
        );
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
    const [session] = useSession()
    
    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <VisualizationCharts
                    email={session.user.email} 
                />
            }
        /> 
    );
}

Visualizer.auth = true; 

Visualizer.defaultProps = {
    meta: {
        title: 'Visualizer',
        description: 'Visualizes key metrics'
    }
}


// export const getServerSideProps = async () => {
//     try {
//         const response = await axios.get('/api/stream/clickstream/hourly')
    
//         return {
//             props: {
//                 clicks: response
//             },
//         };
//     } catch (error) {
//         console.log(error);
//     }
// };

export default Visualizer