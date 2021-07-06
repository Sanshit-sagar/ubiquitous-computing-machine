import React from 'react'

import { useSession, getSession } from 'next-auth/client'
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

const MetricsWrapper = ({ user }) => {
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


export async function getServerSideProps(context) {
    return {
      props: {
        session: await getSession(context)
      }
    }
}