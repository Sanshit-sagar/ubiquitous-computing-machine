import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import DataCharts from '../components/Timeseries'

const Visualizer = ({ meta }) => {
    // const [session] = useSession()
    // const email = session && session?.user ? session.user.email : ''
    const email = 'sasagar@ucsd.edu'

    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <DataCharts email={email} />
            }
        /> 
    );
}

Visualizer.auth = false; 

Visualizer.defaultProps = {
    meta: {
        title: 'Visualizer',
        description: 'Visualizes key metrics'
    }
}

export default Visualizer