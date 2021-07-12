import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '@/sections/StackedLayout'
import NewSlug from '../components/NewSlug'

const NewLinkPage = () => {
  const [session] = useSession()
  const email = session && session?.user ? session.user.email : ''
  // const email = 'sasagar@ucsd.edu'
  
  return (
    <StackedLayout 
        pageMeta={{ 
          title: 'Create a new Slug',
          href: '/new' 
        }} 
        children={
          <NewSlug email={email} />
        }
    />
  );
};

NewLinkPage.auth = true;

export default NewLinkPage 
 