import React, { useContext } from 'react'

import {useSession} from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/MarkdownEditor/InputForm'
import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards'
import CustomSpinner from '../../buildingBlocks/Spinner'

import {GlobalStore} from '../store'

const PageHeadingText = () => {
  const [session, loading] = useSession()
  const state = useContext(GlobalStore.State)

  return (
    <div className="flex-col items-between justify-stretch px-2 py-1"> 
        <h2 className="text-2xl font-bold leading-3 text-white sm:text-3xl sm:truncate">
          { !state.router.current ? loading ? <CustomSpinner /> : session.user.email : state.router.current }
        </h2>
    </div>
  )
}

const NewLinkPage = () => {
  // const [session, loading] = useSession()


  return (
    <div className="container w-full">
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