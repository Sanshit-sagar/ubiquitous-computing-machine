
import React, { useState, useEffect } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'
import OptionsBar from './Options';

import useSWR from 'swr'
import Loader from '../Loader'

function generateData(freqsArr, doFill, graphName, start, end) {
    let freqsLabels = [];
    freqsArr.forEach(function (value, index) {
        freqsLabels.push(`${value.x}`); 
    }); 
    
    const data = {
        labels: freqsLabels,
        datasets: [{
            label: graphName,
            fill: doFill,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
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
    const [scatterPlotArr, setScatterPlotArr] = useState([])
    const [doFill, setDoFill] = useState(true)

    const toggleGraphFill = () => {
        setDoFill(!doFill); 
    }

    const [fetchCount, setFetchCount] = useState(0)
    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data && !freqsArr.length) {
            setFreqsArr(data.freqsArr);
            setCummFreqsArr(data.cummFreqArr);
            setScatterPlotArr(data.scatterPlotArr);

            setFetchCount(fetchCount + 1);  
        }
    }, [loading, error, data, freqsArr]);

    if(loading || !data) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'stretch' }}>
            <OptionsBar 
                bar={
                    <div style={{ height: '100%', width: '100%', margin: '10px 5px 20px 5px' }}>
                        <Bar
                            data={generateData(freqsArr, false, "Page Visit", data.start, data.end)}
                            width={1000}
                            height={500}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                }
                            }}
                        />
                    </div>
                }
                line={
                    <div style={{ height: '500px', width: '100%', margin: '10px 5px 20px 5px' }}>
                        <Line
                            data={generateData(cummFreqsArr, true, "Visit #", data.start, data.end)}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                }
                            }}
                        />
                    </div>
                }
                scatter={
                    <div style={{  height: '500px', width: '100%', margin: '10px 5px 20px 5px' }}>
                        <Scatter
                            data={generateData(scatterPlotArr, false, "Datetime", data.start, data.end)}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                var label = context.dataset.label || '';

                                                if (label) {
                                                    label += ` - ${context.raw.timeOfDay}`;
                                                    label += ` on ${context.raw.date}`; 
                                                }
                                                return label;
                                            },
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                }
                            }}
                        />
                    </div>
                }
                toggleFill={() => {
                    alert('toggling fill')
                    setDoFill(!doFill)
                }}
            />
        </Card>
    );
}

export default DataCharts 
