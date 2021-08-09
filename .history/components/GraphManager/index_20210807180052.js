
import React, { useState, useEffect, useContext } from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { useSession } from 'next-auth/client'

import useSWR from 'swr'

import { GraphStore } from '../../store'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import GraphToolbar from './Toolbar'
import GraphSkeleton from '../Skeletons/GraphSkeleton'

const BAR_CHART_STR = "Daily Pageviews"
const LINE_CHART_STR = "Total Pageviews"
const SCATTER_PLOT_STR = "Scatter Plot"


export const LineChart = () => {
    const state = useContext(GraphStore.State)


    if(!state.cummFreqsArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <Line
            data={dataGenerator(state.cummFreqsArr, true, LINE_CHART_STR, state.datasetStart, state.datasetEnd)}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }}
        />
    )
}

export const ScatterPlot = () => {
    const state = useContext(GraphStore.State)


    if(!state.scatterPlotArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <Scatter
            data={dataGenerator(state.scatterPlotArr, false, SCATTER_PLOT_STR, state.datasetStart, state.datasetEnd)}
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
    )
}

export const BarChart = () => {
    const state = useContext(GraphStore.State)

    if(!state.freqsArr?.length || state.datasetStart >= state.datasetEnd) return <GraphSkeleton />;

    return (
        <Bar
            data={dataGenerator(state.freqsArr, false, BAR_CHART_STR, state.datasetStart, state.datasetEnd)}
            width={1200}
            height={475}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }}
        />
    )
}

function dataGenerator(freqsArr, doFill, graphName, start, end) {
    
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


const GraphFactory = () => {
    const [session, sessionLoading] = useSession()
    const state = useContext(GraphStore.State)

    let email = session && session?.user ? session.user.email : '' 
    const { data, loading, error } = useViewsByFrequency(email);

    if(loading || sessionLoading || error) return <GraphSkeleton />
    if(!data) return (
        <> 
            <h1> no data found </h1> 
            <GraphSkeleton /> 
        </>
    );

    return (
        <Box css={{ height: '450px', width: '1200px', margin: '10px 5px' }}>
           {
                state.selectedTabId=='bar' ?  <BarChart />
            :   state.selectedTabId=='line' ? <LineChart />
            :   <ScatterPlot /> }
        </Box>
    )
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

const GraphManager = () => {
    // const state = useContext(GraphStore.State)
    const [session, userloading] = useSession(); 
    const dispatch = useContext(GraphStore.Dispatch)

    let email = session && session?.user ? session.user.email : '' 
    const { data, loading, error } = useViewsByFrequency(email);
    let isLoading = loading || userLoading;

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

    useEffect(() => {
        if(!loading && !error && data?.freqsArr?.length) {
            dispatchArrUpdate(data);
            dispatchIncrement('fetchCount');  
        } 
        
        if(!data?.freqsArr?.length) {
            setNoData(true);
        }
    }, [loading, error, data]);

    if(error) return <p> error! {error.message} </p>
    
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <GraphToolbar />
            <GraphFactory />
        </Flex>   
    );
}

export default GraphManager 
