import React from 'react'
import { useSession } from 'next-auth/client'

import useSWR from 'swr'

import Layout from '../../sections/Layout'
import SortedStatModal from '../../components/SortedStatModal'


export default function Clickstream({ metadata }) {
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