
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'

import useSWR from 'swr'
import Loader from '../Loader'

const useTimeseries = (email) => {
    // add sanity check for email
    const { data, error } = useSWR(`/api/stream/timeseries`);

    return {
        data: data ? data : {},
        loading: !data && !error,
        error: error
    };
}

const generateData = (data) => {
    //create labels
    
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                { x: 'January',  y: 65 }, 
                { x: 'February', y: 59 }, 
                { x: 'March', y: 80 },
                { x: 'April', y: 81 }, 
                { x: 'May', y: 56 }, 
                { x: 'June', y: 55 }, 
                { x: 'July', y: 40 }, 
            ]
        }
        ]
    };

    return (

    );
}

const DataCharts = ({ email }) => {
    const [graphData, setGraphData] = useState([]);
    const [fetchCount, setFetchCount] = useState(0);
    const { data, loading, error } = useTimeseries(email) 

    useEffect(() => {
        if(data && data?.timeseries) {
            let dataset = data.timeseries;
            setGraphData(dataset);
            setFetchCount(fetchCount + 1); 
        }
    }, [data.timeseries, loading, error, graphData, fetchCount]); 

    if(loading) return <Loader />;
    if(error) return <p> Error: {error.message} </p>
    
    return (
        <Card>
            <div style={{ height: '500px', width: '500px', margin: '10px 5px 20px 5px' }}>
                <h2> {`Clickstream--${fetchCount}`} </h2>
                <Line
                    data={data}
                    width={400}
                    height={400}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </Card>
    );
}

export default DataCharts 
