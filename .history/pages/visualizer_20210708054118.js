import React, { useState, useEffect } from 'react'

import { useSession, getSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'
import { Card, Button } from '@supabase/ui'

import aggregateStats from '../lib/statistics'
import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

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

function useHourlyClickstream(email) {
    const { data, error } =  useSWR('/api/stream/clickstream/hourly')

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
        clickstream: data ? data.clickstream : [],
        timeseries: data ? data.timeseries : [],
        frequencies: data ? data.freq : [],
        loading: !data && !error,
        error
    };   
}

const VisualizationCharts = ({ time, email }) => {
    const { statistics, individual, cummulative, frequencies, loading, error } = useHourlyClickstream(email);

    return (
        <Card title="Visualizer">
           {    
                    loading ? <Loader /> 
                :   error   ? <p> Error! </p> 
                :   (
                <>
                    <p> {JSON.stringify(statistics)} </p> 
                    <p> {JSON.stringify(individual)} </p> 
                </>
            )}
        </Card>
    );
}

const Visualizer = () => {
    const [time, setTime] = useState('30s')
    const email = 'sasagar@ucsd.edu'

    return (
        <StackedLayout
            pageMeta={{
                title: 'Leaderboards',
                description: 'yadiddads'
            }}
            children={
                <VisualizationCharts
                    time={time}
                    email={email} 
                />
            }
        /> 
    );
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