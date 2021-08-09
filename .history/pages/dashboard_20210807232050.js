import React from 'react'

import { useSession } from 'next-auth/client'

import Layout from '../sections/Layout'
import StatisticsCards from '../components/StatisticsCards'
import StatTables from '../components/StatTables'

const Dashboard = ({ email }) => {
    return (
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
            <StatTables email={email} />   
        
            <StatisticsCards email={email} />
        </Flex>
        
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