
import React, { useState, useEffect, useContext } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';

import useSWR from 'swr'
import Loader from '../Loader'
import OptionsBar from './Options'
import { GraphStore } from '../../store'

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
    const state = useContext(GraphStore.State)
    const dispatch = useContext(GraphStore.Dispatch)

    // const [freqsArr, setFreqsArr] = useState([])
    // const [cummFreqsArr, setCummFreqsArr] = useState([])
    // const [scatterPlotArr, setScatterPlotArr] = useState([])
    // const [labelsArr, setLabelsArr] = useState([])
    // const [fetchCount, setFetchCount] = useState(0)

    const dispatchArrUpdate  = (updatedArray, updatedName) => {
        dispatch({
            type: `update_array`,
            payload: {
                key: `${updatedName}`,
                value: updatedArray,
            }
        });
    }

    const dispatchIncrement = (keyToIncrement) => {
        dispatch({
            type: `increment`,
            payload: {
                value: `${keyToIncrement}`
            }
        }); 
    }

    const dispatchSelect = (selectedTabId) => {
        dispatch({
            type: 'select',
            payload: {
                key: `selectedTab`,
                value: selectedTabId
            }
        });
    }

    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data) {
            dispatchArrUpdate(data.freqsArr, 'freqsArr');
            dispatchArrUpdate(data.cummFreqArr, 'cummFreqArr');
            dispatchArrUpdate(data.scatterPlotArr, 'scatterPlotArr');
 
            let freqsLabels = [];
            data.freqsArr.forEach(function (value, index) {
                freqsLabels.push(`${value.x}`); 
            }); 

            dispatchArrUpdate(freqsLabels, 'freqsLabels');
            dispatchIncrement('fetchCount');  
        }
    }, [loading, error, data]);

    if(!data || loading) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card interactive={true} ghost active={true}>
            <OptionsBar 
                bar={<BarChart freqsArr={state.freqsArr} barChartStr={state.barChartStr} data={state.data} />}
                line={<LineChart cummFreqsArr={state.cummFreqsArr} lineChartStr={state.lineChartStr} data={state.data} />}
                scatter={<ScatterPlot scatterPlotArr={state.scatterPlotArr} scatterPlotStr={state.scatterPlotStr} data={state.data} />}
                handleSelection={dispatchSelect}
            />
            <h1> { state.selectedTab }</h1> 
        </Card>
    );
}

export default DataCharts 
