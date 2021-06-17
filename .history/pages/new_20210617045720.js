import React, { useSession, useMemo, useRef, useContext } from 'react'

import {
  LocationMarkerIcon
} from '@heroicons/react/solid'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/MarkdownEditor/InputForm'
import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards'

import {GlobalStore} from '../store'

const PageHeadingText = () => {
  const state = useContext(GlobalStore.State)

  return (
    <div className="flex-col items-start justify-start">
      <div className="flex-1 min-w-0">

        <h2 className="text-2xl font-bold leading-3 text-white sm:text-3xl sm:truncate">
          { !state.router.current ? session.user.email : state.router.current }
        </h2>

        <div className="mt-2 flex items-center text-sm text-gray-300">
          <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" aria-hidden="true" />
          Mock IP data goes here 
        </div>

      </div>
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