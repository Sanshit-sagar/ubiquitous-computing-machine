import React from 'react'

import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import DashboardGraphs from '../components/DashboardGraphs'
import Loader from '../components/Loader'

const Metrics = ({ email }) => {

    if(!email || !email.length) {
        email = 'sasagar@ucsd.edu'
    }
   
    return (
        <div className="container mx-auto">
            <div className="inline-flex justify-start align-start">
                <StatisticsCards email={email} /> 
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
                <Metrics email={email} />
            }
        />
    )
}

MetricsWrapper.auth = true