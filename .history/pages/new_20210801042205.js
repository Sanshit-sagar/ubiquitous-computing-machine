import React from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../sections/Layout'
import NewSlug from '../components/NewSlug'


const NewLinkPage = ({ metadata }) => {
  const [session] = useSession()
  const email = session && session?.user ? session.user.email : ''
  
  return (
    <Layout 
        metadata={metadata} 
        children={
            <NewSlug email={email} />
        }
    />
  );
};

NewLinkPage.defaultProps =  {
  metadata: {
    title: 'New Slug',
    description: 'Options for creating a new slug' 
  }
};

export default NewLinkPage 
 