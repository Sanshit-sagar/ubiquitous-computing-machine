import React from 'react'


import { Card } from '@supabase/ui'

import StackedLayout from '../sections/StackedLayout'
import StatisticsCards from '../components/StatisticsCards'
import StatTables from '../components/StatTables'
import StickySidebar from '../components/StickySidebar'


const Dashboard = ({ email }) => {
    return (
        <Card style={{ minWidth: '800px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
            <div className="w-full max-w-md p-2 mx-auto bg-white rounded-md">
                <div className="w-full inline-flex justify-start align-stretch">
                    <StatisticsCards email={email} /> 
                    <StatTables email={email} />
                </div>
                <div className="h-full inline-flex justify-start align-end">
                    <StickySidebar />
                </div>
            </div>
        </Card>
    )
}

export default function DashboardPage({ meta }) {
    // const [session] = useSession()
    // const email = session.user.email;

    const email = 'sasagar@ucsd.edu'

    return (
        <StackedLayout
            pageMeta={meta}
            children={
                <Dashboard email={email} />
            }
        />
    )
}

DashboardPage.auth = false; //TODO

DashboardPage.defaultProps = {
    meta: {
        title: 'Dashboard',
        description: 'Displays key metrics'
    }
}