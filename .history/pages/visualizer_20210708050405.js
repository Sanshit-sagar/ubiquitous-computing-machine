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

    const {timeseries, cummulative, freqs, skipped, count, average, max, minTime, maxTime, timespan} = data

    return {
        statistics: data ? { skipped, count, average, max, minTime, maxTime, timespan } : null,
        individual: data ? data.timeseries : null,
        cummulative: data ? data.cummulative : null,
        frequencies: data ? data.frequencies : null,
        loading: !data && !error,
        error: error
    }; 
}

const VisualizationCharts = ({ time, email }) => {
    const { timeseries, cummulative, freqs, skipped, count, average, max, minTime, maxTime, timespan } = useHourlyClickstream(email);

    return (
        <Card title="Visualizer">
            <p> {JSON.stringify(timeseries)} </p>
            <p> {JSON.stringify(cummulative)} </p>
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