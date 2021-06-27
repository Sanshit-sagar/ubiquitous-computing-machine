import React, {useState, useContext, useMemo, useRef, useEffect} from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'
import axios from 'axios'

import { Windmill } from '@windmill/react-ui'

import { GlobalStore } from '../store'
import { fetchAndWait } from '@/lib/fetchWrapper'
import useDateTimeLocalizer from '../hooks/useDateTimeLocalizer'

import StackedLayout from '../sections/StackedLayout'
// import StatisticsCards from '../components/StatisticsCards'

import Loader from '../components/Loader'
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