import React from 'react'

import { useSession } from 'next-auth/client'
import { Card } from '@supabase/ui'
import useSWR from 'swr'
import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'
import { Bar } from 'react-chartjs-2'

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }
  

const DataCharts = () => {
    
    render() {
      return (
        <div>
          <h2>Bar Example </h2>
          <Bar
            data={data}
            width={400}
            height={200}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      );
    }
}

const Visualizer = ({ meta }) => {
    const [session] = useSession()
    const email = session && session?.user ? session.user.email : ''
    
    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <DataCharts email={email} />
            }
        /> 
    );
}

Visualizer.auth = true; 

Visualizer.defaultProps = {
    meta: {
        title: 'Visualizer',
        description: 'Visualizes key metrics'
    }
}

export default Visualizer