import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '@/sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

export default function LinksPage({ metadata }) {
    const [session] = useSession()
    const email  = (session && session?.user) ? session.user.email : ''
    
    return (
        <StackedLayout 
            pageMeta={meta} 
            children={
                <div className="mt-2">
                    <SortedStatModal 
                        filter="allLinks" 
                        email={email} 
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
  
  