import React from 'react'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'

import Loader from '../../components/Loader'
import Layout from '../../sections/Layout'
import SortedStatModal from '../../components/SortedStatModal'

import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline'

export const useViewsBySlug = (email, slug) => {
   
    const { data, error } = useSWR(email && email.length && slug && slug.length ? `/api/stream/slugs/${slug}?email=${email}` : null, fetcher)

    return {
        views: data ? data.views : undefined,
        viewsLoading: !data && !error,
        viewsError: error
    }
}

export const ViewsDisplay = ({ slug, email }) => {
    const { views, viewsLoading, viewsError } = useViewsBySlug(email, slug)

    if(viewsLoading) return <Loader />;
    if(viewsError) return <p> Error!! </p>;

    const delta = 1

    return (
        <>
            <div className="flex-col justify-between align-stretch">
                <div className="text-sm">  
                    {views.total} total
                </div>
                <div className="text-xs">
                    {views.unique} unique
                </div> 
            </div>
            <div className="inline-flex justify-end align-center">
                {   delta > 0 ? 
                    <TrendingUpIcon className="h-5 w-5 text-green-500" /> :
                    <TrendingDownIcon className="h-5 w-5 text-red-300" />
                }
            </div>
        </>
    )
}

export default function Clickstream() {
    const [session] = useSession()
    const email  = session && session?.user ? session.user.email : ''

    return (
        <Layout 
            metadata={metadata} 
            children={
                <SortedStatModal 
                    filter="allViews" 
                    email={email}
                />
            }
        />
    )
}

Clickstream.defaultProps = {
    metadata = {
        'title': 'Dashboard',
        'description': 'Realtime stats such as: Number of views, unique visitors, most viewed pages and live clickstreams',
    }
}