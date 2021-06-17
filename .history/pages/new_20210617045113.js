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
      <StackedLayout 
        pageMeta={{ title: 'Write blog post' }} 
        children={
          <div className="w-full overflow-auto">
            <div className="w-full inline-flex justify-items-between align-center">
              <div className="w-full flex-col justify-start align-start">
                  <Breadcrumbs />
                  <PageHeadingText />
              </div>

              <StatisticsCards /> 
            </div>

            <InputForm />
          </div>
        }
      />
    </div>
  );
};

export default NewLinkPage;