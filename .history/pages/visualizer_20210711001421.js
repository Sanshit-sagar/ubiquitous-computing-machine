import React from 'react'

import { useSession } from 'next-auth/client'
import { Card } from '@supabase/ui'
import useSWR from 'swr'
import Loader from '../components/Loader'

import StackedLayout from '../sections/StackedLayout'
import DataCharts from '../components/Timeseries'

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