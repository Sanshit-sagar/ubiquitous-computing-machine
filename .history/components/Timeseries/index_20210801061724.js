
import React, { useState, useEffect, useContext } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';

import useSWR from 'swr'
import Loader from '../Loader'
import OptionsBar from './Options'
import { GlobalStore } from '../../store'

import { Card } from '../../primitives/Card' 

// import { CustomToolbar } from '../../primitives/Toolbar'

const LineChart = ({ cummFreqsArr, lineChartStr, data }) => {

    return (
        <div style={{ height: '425px', width: '1200px', margin: '10px 10px 20px 5px' }}>
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
    )
}

const ScatterPlot = ({ scatterPlotArr, scatterPlotStr, data }) => {
    
    return (
        <div style={{  height: '425px', width: '1200px', margin: '10px 10px 20px 5px' }}>
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
    )
}

const BarChart = ({ freqsArr, barChartStr, data }) => {

    return (
        <div style={{ height: '100%', width: '1200px', margin: '10px 10px 20px 5px' }}>
            <Bar
                data={generateData(freqsArr, false, barChartStr, data.start, data.end)}
                width={1000}
                height={425}
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
    )
}



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

// const BAR_CHART_STR = "Daily Pageviews"
// const LINE_CHART_STR = "Total Pageviews"
// const SCATTER_PLOT_STR = "Scatter Plot"

const DataCharts = ({ email }) => {
    const state = useContext(Graphs.State)

    // const [freqsArr, setFreqsArr] = useState([])
    // const [cummFreqsArr, setCummFreqsArr] = useState([])
    // const [scatterPlotArr, setScatterPlotArr] = useState([])
    // const [labelsArr, setLabelsArr] = useState([])
    // const [fetchCount, setFetchCount] = useState(0)

    const dispatchArrUpdate  = (updatedName, updatedArray) => {
        dispatch({
            type: `${updatedName}`,
            payload: {
                value: updatedArray,
            }
        });
    }

    const dispatchIncrement = () => {
        dispatch({
            type: `increment`,
            payload: {
                value: 'fetchCount'
            }
        }); 
    }

    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data) {
            dispatchArrUpdate(data.freqsArr);
            dispatchArrUpdate(data.cummFreqArr);
            dispatchArrUpdate(data.scatterPlotArr);

            let freqsLabels = [];
            freqsArr.forEach(function (value, index) {
                freqsLabels.push(`${value.x}`); 
            }); 
            dispatchArrUpdate(freqsLabels)
            dispatchIncrement(fetchCount + 1);  
        }
        // cummFreqArr, scatterPlotArr, freqLabels, fetchCount -> values that will be updated
    },   // -> should listen to updates from these, SWR updates should load once every 15 secs
    [loading, error, data, freqsArr]);

    if(!data || loading) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card interactive={true} ghost active={true}>
            <OptionsBar 
                bar={<BarChart freqsArr={freqsArr} barChartStr={barChartStr} data={data} />}
                line={<LineChart cummFreqsArr={cummFreqsArr} lineChartStr={lineChartStr} data={data} />}
                scatter={<ScatterPlot scatterPlotArr={scatterPlotArr} scatterPlotStr={scatterPlotStr} data={data} />}
            />
        </Card>
    );
}

export default DataCharts 
