
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Card, Button } from '@supabase/ui'

import useSWR from 'swr'
import Loader from '../Loader'

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

const DataCharts = () => {
    
    return (
        <Card style={{ height: '500px', width: '500px' }}>
            <h2>Line Chart </h2>
            <Line
                data={data}
                width={400}
                height={400}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </Card>
    );
}

export default DataCharts 
