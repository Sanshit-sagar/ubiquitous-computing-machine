
import React, { useState, useEffect, useContext } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Card, Elevation } from '@blueprintjs/core'

import useSWR from 'swr'
import Loader from '../Loader'
import OptionsBar from './Options'
import { GlobalStore } from '../../store'

function generateData(freqsArr, doFill, graphName, start, end) {
    let freqsLabels = [];
    freqsArr.forEach(function (value, index) {
        freqsLabels.push(`${value.x}`); 
    }); 

    const data = {
        labels: freqsLabels,
        datasets: [{
            label: `${graphName}`,
            fill: doFill,
            lineTension: 0.2,
            backgroundColor: 'rgba(0,169,109,0.4)',
            borderColor: 'rgba(0,169,109,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,169,109,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,169,109,1)',
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

const barChartStr = " Pageview"
const lineChartStr = " Visit #"
const scatterPlotStr = " "

const DataCharts = ({ email }) => {
    const state = useContext(GlobalStore.State)

    const [freqsArr, setFreqsArr] = useState([])
    const [cummFreqsArr, setCummFreqsArr] = useState([])
    const [scatterPlotArr, setScatterPlotArr] = useState([])
    const [doFill, setDoFill] = useState(true)
    const [labelsArr, setLabelsArr] = useState([])

    const [fetchCount, setFetchCount] = useState(0)
    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data && !freqsArr.length) {
            setFreqsArr(data.freqsArr);
            setCummFreqsArr(data.cummFreqArr);
            setScatterPlotArr(data.scatterPlotArr);

            let freqsLabels = [];
            freqsArr.forEach(function (value, index) {
                freqsLabels.push(`${value.x}`); 
            }); 
            setLabelsArr(freqsLabels)
            setFetchCount(fetchCount + 1);  
        }
    }, [loading, error, data, freqsArr]);

    if(loading || !data) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card 
            interactive={true} 
            elevation={Elevation.TWO} 
            style={{  width: '1275px', backgroundColor: !state.darkMode ? 'rgba(54,64,82,1)' : 'rgba(255,255,255,1)', display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'stretch' }}
        >
            <OptionsBar 
                bar={
                    <div style={{ height: '100%', width: '1200px', margin: '10px 10px 20px 5px' }}>
                        <Bar
                            data={generateData(freqsArr, false, barChartStr, data.start, data.end)}
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
                    <div style={{ height: '500px', width: '1200px', margin: '10px 10px 20px 5px' }}>
                        <Line
                            data={generateData(cummFreqsArr, true, lineChartStr, data.start, data.end)}
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
                    <div style={{  height: '500px', width: '1200px', margin: '10px 10px 20px 5px' }}>
                        <Scatter
                            data={generateData(scatterPlotArr, false, scatterPlotStr, data.start, data.end)}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                var label = context.dataset.label || '';

                                                if (label) {
                                                    label += `${context.raw.timeOfDay}`;
                                                    label += ` on ${context.raw.date}`; 
                                                }
                                                return label;
                                            },
                                        }
                                    },
                                    legend: {
                                        display: false,
                                    }
                                },
                            }}
                        />
                    </div>
                }
                stacked={
                    <div style={{  height: '500px', width: '1200px', margin: '10px 10px 20px 5px' }}>
                        <Line
                            data={{
                                labels: labelsArr,
                                datasets: [
                                    {
                                        label: 'Page Views',
                                        data: freqsArr,
                                        borderColor: 'rgba(0,169,109,1)',
                                        order: 0,
                                        type: 'bar'
                                    },
                                    {
                                        label: 'Total Views',
                                        data: cummFreqsArr,
                                        color: 'rgba(0,169,109,1)',
                                        order: 1
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: false,
                                    }
                                },
                                scales: {
                                    y: {
                                        stacked: true
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
