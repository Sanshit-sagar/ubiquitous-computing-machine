import React from 'react'

import StackedLayout from '../sections/StackedLayout'
import DashboardGraphs from '../components/DashboardGraphs'

const Metrics = () => {
   
    return (
        <div className="container mx-auto">
            <div className="inline-flex justify-start align-start">
                <DashboardGraphs /> 
            </div>
        </div>
    )
}

export default function MetricsWrapper() {
    const [session] = useSession()
    const email = session ? session.user.email : ''

    const metricsMetadata = {
        title: 'Metrics',
        description: 'TODO'
    }

    return (
        <StackedLayout
            pageMeta={metricsMetadata}
            children={
                <Metrics />
            }
        />
    )
}

MetricsWrapper.auth = true