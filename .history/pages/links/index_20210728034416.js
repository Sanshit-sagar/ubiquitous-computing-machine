import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '@/sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

export default function LinksPage({ meta }) {
    const [session] = useSession()
    const email  = session.user.email
    
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

LinksPage.auth = true

LinksPage.defaultProps = {
    meta: { 
        title: 'Links', 
        description: 'All your saved slugs' 
    }
}
  
  