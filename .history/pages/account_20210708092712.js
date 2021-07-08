import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import Profile from '../components/Profile'

const AccountPage = () => {
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
            <Profile user={session.user} />
          }
      />
  );
};

AccountPage.auth = true; 

export default AccountPage 