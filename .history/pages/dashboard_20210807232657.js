import React from 'react'

import { useSession } from 'next-auth/client'

import Layout from '../sections/Layout'
import StatTables from '../components/StatTables'


const DashboardPage = ({ metadata }) => {
    const [session, loading] = useSession()
    const email = session && !loading ? session.user?.email : ''

    return (
        <Layout
            metadata={metadata}
            children={
                <StatTables />
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