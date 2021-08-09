import React from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../../sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

export default function LinksPage({ metadata }) {
    const [session, loading] = useSession()

    if(!session && !loading) return <p> Error! </p>
    
    return (
        <Layout 
            metadata={metadata} 
            children={
                <div className="mt-2">
                    <SortedStatModal 
                        filter="allLinks" 
                        email={!loading && session?.user ? session.user?.email : ''} 
                        loading={loading}
                    />
                </div>
            }
        />
    );
}

LinksPage.defaultProps = {
    metadata: { 
        title: 'Links', 
        description: 'All your saved slugs' 
    }
}
  
  