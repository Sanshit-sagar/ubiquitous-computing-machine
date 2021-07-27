import React from 'react'

import { useSession } from 'next-auth/client'
import StackedLayout from '../sections/StackedLayout'
import StatisticsCards from '../components/StatisticsCards'
import StatTables from '../components/StatTables'

const Dashboard = ({ email }) => {
    return (
        <Card interactive={true} ghost active={true}>
            <div className="w-65">
                <StatTables email={email} />   
            </div>

            <div className="w-30">
                <StatisticsCards email={email} />
            </div>    
        </Card>
    )
}

const DashboardPage = ({ meta }) => {
    const [session] = useSession()
    const email = session.user.email

    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <Dashboard email={email} />
            }
        />
    )
}

DashboardPage.auth = true; 

DashboardPage.defaultProps = {
    meta: {
        title: 'Dashboard',
        description: 'Displays key metrics'
    }
}

export default DashboardPage