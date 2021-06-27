import React from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import StackedLayout from '../sections/StackedLayout'
import DashboardGraphs from '../components/DashboardGraphs'

const Metrics = () => {
    const [session, loading] = useSession();
    const router = useRouter()
   

    return (
        <div className="container mx-auto">
            <div className="inline-flex justify-start align-start">
                <DashboardGraphs /> 
            </div>
        </div>
    )
}

const MetricsWrapper = () => {

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

export default MetricsWrapper