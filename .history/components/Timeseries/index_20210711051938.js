
import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'

import useSWR from 'swr'
import Loader from '../Loader'

function generateData(graphData, timeseriesStart, timeseriesEnd) {
    let graphLabels = [];
    graphData.forEach(function (value, index) {
        graphLabels.push(`${value.x}`); 
    }); 
    
    const data = {
        labels: graphLabels,
        datasets: [{
            label: `${timeseriesStart}-${timeseriesEnd}`,
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
        scales:     {
            xAxes: [{
                    type: "time",
                    time:       {
                    format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display:     true,
                    labelString: 'Date'
                }
            }],
        },
    };
    return data;
}

const useTimeseries = (email) => {
    // add sanity check for email
    const { data, error } = useSWR(`/api/stream/timeseries`);

    return {
        data: data ? data : {},
        loading: !data && !error,
        error: error
    };
}


const DataCharts = ({ email }) => {
    const [graphData, setGraphData] = useState([]);
    const [fetchCount, setFetchCount] = useState(0);
    const { data, loading, error } = useTimeseries(email) 

    useEffect(() => {
        if(!graphData.length && data && data?.timeseries) {
            setGraphData([...data.timeseries]);
            setFetchCount(fetchCount + 1); 
        }
    }, [data?.timeseries, loading, error, graphData]); 

    if(loading || !data) return <Loader />;
    if(error) return <p> Error: {error.message} </p>
    
    return (
        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'stretch'}}>
            <h1> {fetchCount} </h1>
            <div style={{ height: '500px', width: '500px', margin: '10px 5px 20px 5px' }}>
                <Line
                    data={generateData(graphData, data.minTime, data.maxTime)}
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
