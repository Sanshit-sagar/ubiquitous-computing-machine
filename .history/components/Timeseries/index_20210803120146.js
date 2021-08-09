
import React, { useEffect, useContext } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';

import useSWR from 'swr'
import Loader from '../Loader'

import { GraphStore } from '../../store'

import { Card } from '../../primitives/Card' 
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import ContentLoader from 'react-content-loader'

import GraphToolbar from './GraphToolbar'

const BAR_CHART_STR = "Daily Pageviews"
const LINE_CHART_STR = "Total Pageviews"
const SCATTER_PLOT_STR = "Scatter Plot"

export const GraphSkeleton = () => {

    return (
        <ContentLoader width={1000} height={500} viewBox="0 0 1000 500">
            <rect x="0" y="160" rx="0" ry="0" width="75" height="500" />
            <rect x="80" y="145" rx="0" ry="0" width="75" height="355" />
            <rect x="160" y="126" rx="0" ry="0" width="75" height="376" />
            <rect x="240" y="80" rx="0" ry="0" width="75" height="420" />
            <rect x="320" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="400" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="480" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="560" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="640" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="720" y="142" rx="0" ry="0" width="75" height="500" />
            <rect x="800" y="142" rx="0" ry="0" width="75" height="355" />
            <rect x="880" y="142" rx="0" ry="0" width="75" height="376" />
            <rect x="760" y="142" rx="0" ry="0" width="75" height="420" />
            <rect x="840" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="920" y="142" rx="0" ry="0" width="75" height="358" />
        </ContentLoader>
    )
}

export const LineChart = () => {
    const state = useContext(GraphStore.State)


    if(!state.freqsArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <div style={{ height: '425px', width: '1200px', margin: '10px 10px 20px 5px' }}>
            <Line
                data={generateData(state.cummFreqsArr, true, state.lineChartStr, state.datasetStart, state.datasetEnd)}
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

export const ScatterPlot = () => {
    const state = useContext(GraphStore.State)


    if(!state.freqsArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <div style={{  height: '425px', width: '1200px', margin: '10px 10px 20px 5px' }}>
            <Scatter
                data={generateData(state.scatterPlotArr, false, "Scattered", state.datasetStart, state.datasetEnd)}
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

export const BarChart = () => {
    const state = useContext(GraphStore.State)

    if(!state.freqsArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <Box css={{ height: '100%', width: '1200px', margin: '10px 10px 20px 5px' }}>
            <Bar
                data={generateData(state.freqsArr, false, "Barred", state.datasetStart, state.datasetEnd)}
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
        </Box>
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

const DataCharts = ({ email }) => {
    const state = useContext(GraphStore.State)
    const dispatch = useContext(GraphStore.Dispatch)

    const dispatchArrUpdate  = (data) => {
        let freqsLabels = [];

        data.freqsArr.map(function (value, index) {
            freqsLabels.push(`${value.x}`); 
        }); 

        dispatch({
            type: `update_datasets`,
            payload: {
                freqsArr: data.freqsArr,
                cummFreqsArr: data.cummFreqArr, 
                scatterPlotArr: data.scatterPlotArr,
                freqsLabelsArr: freqsLabels,
                datasetStart: data.start,
                datasetEnd: data.end,
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

    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data?.freqsArr?.length) {
            dispatchArrUpdate(data);
            dispatchIncrement('fetchCount');  
        }
    }, [loading, error, data]);


    if(!data || loading) return <Loader />;
    if(error) return <p> error! {error.message} </p>
    
    return (
        <Card interactive={true} ghost active={true}>
            {/* <GraphToolbar  /> */}
            <GraphSkeleton /> 
        </Card>
    );
}

export default DataCharts 
