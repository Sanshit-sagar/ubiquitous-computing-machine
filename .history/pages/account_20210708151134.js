import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import Profile from '../components/Profile'

const AccountPage = ({ meta }) => {
  // const [session] = useSession()
  const email = 'sasagar@ucsd.edu'

  return (
      <StackedLayout 
          pageMeta={meta} 
          children={
            <Profile email={email} />
          }
      />
  );
};

AccountPage.auth = false; 

AccountPage.defaultProps = {
    meta: {
        title: 'Create a new Slug',
        href: '/new' 
    }
};

export default AccountPage 