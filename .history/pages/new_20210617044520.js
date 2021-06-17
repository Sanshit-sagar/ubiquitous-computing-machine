import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/MarkdownEditor/InputForm'
import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards'

const NewLinkPage = () => {
  const [session, loading] = useSession()
  
  return (
    <div className="container w-full mx-auto py-6 px-4">

        <div className="w-full inline-flex justify-between items-center">
            <div className="flex-col justify-start items-start">
                <Breadcrumbs />
                <h2 className="text-3xl py-2 border-b mb-4">
                    {`${session && !loading ? session.user.email : '...'}`}
                </h2>
            </div>

            <StatisticsCards /> 
      
            <StackedLayout 
              pageMeta={{ title: 'Write blog post' }} 
              children={<InputForm />} 
            />
        </div>
    </div>
  );
};

export default NewLinkPage;