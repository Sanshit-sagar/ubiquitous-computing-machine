import React from 'react'

import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import DashboardGraphs from '../components/DashboardGraphs'

const Metrics = ({ email }) => {
   
    return (
        <div className="container mx-auto">
            <div className="inline-flex justify-start align-start">
                <DashboardGraphs email={email} /> 
            </div>
        </div>
    )
}

export default function MetricsWrapper() {
    const [session, loading] = useSession()
    const email = session && session?.user ? session.user.email : ''

    const metricsMetadata = {
        title: 'Metrics',
        description: 'TODO'
    }

    return (
        <StackedLayout
            pageMeta={metricsMetadata}
            children={
                <Metrics email={email} />
            }
        />
    )
}

MetricsWrapper.auth = false