import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import StatisticsCards from '../components/StatisticsCards'

// import DashboardGraphs from '../components/DashboardGraphs'
// import Loader from '../components/Loader'

const Dashboard = ({ email }) => {

    return (
        <div className="container mx-auto">
            <div className="inline-flex justify-start align-start">
                <StatisticsCards email={email} /> 
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const [session] = useSession()
    const email = session.user.email;

    const metricsMetadata = {
        title: 'Metrics',
        description: 'TODO'
    }

    return (
        <StackedLayout
            pageMeta={metricsMetadata}
            children={
                <Dashboard email={email} />
            }
        />
    )
}

DashboardPage.auth = true