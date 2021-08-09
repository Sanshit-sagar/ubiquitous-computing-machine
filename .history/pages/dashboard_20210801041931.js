import React from 'react'

import { useSession } from 'next-auth/client'
import Layout from '../sections/Layout'
import StatisticsCards from '../components/StatisticsCards'
import StatTables from '../components/StatTables'

const Dashboard = ({ email }) => {
    return (
        <div className="inline-flex flex-nowrap justify-between align-start mb-5">
            <div className="w-65">
                <StatTables email={email} />   
            </div>

            <div className="w-30">
                <StatisticsCards email={email} />
            </div>    
        </div>
    )
}

const DashboardPage = ({ metadata }) => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user?.email : ''

    return (
        <Layout
            metadata={metadata}
            children={
                <Dashboard email={email} />
            }
        />
    )
}

DashboardPage.defaultProps = {
    metadata: {
        title: 'Dashboard',
        description: 'Displays key metrics'
    }
}

export default DashboardPage