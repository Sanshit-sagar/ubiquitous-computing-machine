
import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'
import OptionsBar from './Options';

import useSWR from 'swr'
import Loader from '../Loader'

function generateData(freqsArr, start, end) {
    let freqsLabels = [];
    freqsArr.forEach(function (value, index) {
        freqsLabels.push(`${value.x}`); 
    }); 
    
    const data = {
        labels: freqsLabels,
        datasets: [{
            label: "Page visits",
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
            data: freqsArr,
        }],
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            }
        }
    };

    return data;
}

const useViewsByFrequency = (email) => {
    // add sanity check for email
    const { data, error } = useSWR(`/api/graphs/frequency/${email}`);

    return {
        data: data ? data : {},
        loading: !data && !error,
        error: error
    };
}


const DataCharts = ({ email }) => {
    const [freqsArr, setFreqsArr] = useState([])
    const [cummFreqsArr, setCummFreqsArr] = useState([])
    const [fetchCount, setFetchCount] = useState(0)
    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data && !freqsArr.length) {
            setFreqsArr(data.freqsArr);
            setCummFreqsArr(data.cummFreqArr);

            setFetchCount(fetchCount + 1);  
        }
    }, [loading, error, data, freqsArr]);

    if(loading || !data) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'stretch' }}>
            <OptionsBar 
                barChart={
                    <div style={{ height: '100%', width: '100%', margin: '10px 5px 20px 5px' }}>
                        <Bar
                            data={generateData(freqsArr, data.start, data.end)}
                            width={1000}
                            height={500}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                }
                lineChart={
                    <Line
                        data={generateData(cummFreqsArr, data.start, data.end)}
                        width={1000}
                        height={400}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />
                }
                mapChart={null} 
            />
        </Card>
    );
}

export default DataCharts 
