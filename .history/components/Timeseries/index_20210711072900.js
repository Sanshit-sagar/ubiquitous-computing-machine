
import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'

import useSWR from 'swr'
import Loader from '../Loader'

function generateData(graphData, windowStart, windowEnd) {
    let graphLabels = [];
    graphData.forEach(function (value, index) {
        graphLabels.push(`${value.x}`); 
    }); 
    
    const data = {
        labels: graphLabels,
        datasets: [{
            label: `${windowStart}-${windowEnd}`,
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
            data: graphData,
        }],
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            }
        },
    };

    return data;
}

const useViewsByFrequency = (email) => {
    // add sanity check for email
    const { data, error } = useSWR(`/api/stream/frequency/${email}`);

    return {
        data: data ? data : {},
        loading: !data && !error,
        error: error
    };
}


const DataCharts = ({ email }) => {
    const [freqsArr, setFreqsArr] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const { data, loading, error } = useViewsByFrequency(email);

    if(loading || !freqs) return <Loader />;
    if(error) return <p> error! {error.message} </p>

    useEffect(() => {
        if(!loading && !error && freqs && !freqsArr) {
            setFreqsArr(freqs); 
            setFetchCount(fetchCount + 1); 
        }
    }, [loading, error, freqs, freqsArr]);
    
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'stretch'}}>
            <h1> {fetchCount} </h1>

            <div style={{ height: '500px', width: '1000px', margin: '10px 5px 20px 5px' }}>
                <Line
                    data={generateData(freqsArr, data.start, data.end)}
                    width={1000}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </Card>
    );
}

export default DataCharts 
