import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/MarkdownEditor/InputForm'
import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards'

const NewLinkPage = () => {
  const [session, loading] = useSession()

  return (
    <div className="container w-full mx-auto py-0 px-2">
        {/* <div className="w-full inline-flex justify-between items-center"> */}
            {/* <div className="w-full flex-col justify-start items-start"> */}
                
                <StackedLayout 
                  pageMeta={{ title: 'Write blog post' }} 
                  children={
                    <div className="w-full overflow-auto">
                      <div className="inline-flex justify-items-between align-center">
                        <div className="flex-col justify-start align-start">
                            <Breadcrumbs />

                            <h2 className="text-3xl py-2 border-b mb-4">
                                {`${session && !loading ? session.user.email : '...'}`}
                            </h2>
                        </div>
                        <StatisticsCards /> 
                      </div>

                      <InputForm />
                    </div>
                  }
                />
            {/* </div> */}
        {/* </div> */}
    </div>
  );
};

export default NewLinkPage;