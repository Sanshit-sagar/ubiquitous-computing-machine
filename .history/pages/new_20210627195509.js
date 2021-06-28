import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/NewSlug'


export default function NewLinkPage() {
  const [session, loading] = useSession()

  return (
    
      <StackedLayout 
          pageMeta={{ 
            title: 'Create a new Slug',
            href: '/new' 
          }} 
          children={
            <InputForm />
          }
      />
   
  );
};