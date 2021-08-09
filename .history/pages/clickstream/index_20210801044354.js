import React from 'react'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'

import Layout from '../../sections/Layout'
import Loader from '../../components/Loader'
import SortedStatModal from '../../components/SortedStatModal'

export const useViewsBySlug = (email, slug) => {
   
    const { data, error } = useSWR(email?.length && slug?.length ? `/api/stream/slugs/${slug}?email=${email}` : null, fetcher)

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
        </>
    )
}

export default function Clickstream() {
    const [session, loading] = useSession()
    const email  = !loading && session?.user ? session.user.email : ''

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
    );
}

Clickstream.defaultProps = {
    metadata: {
        'title': 'Dashboard',
        'description': 'Realtime stats such as: Number of views, unique visitors, most viewed pages and live clickstreams',
    }
}