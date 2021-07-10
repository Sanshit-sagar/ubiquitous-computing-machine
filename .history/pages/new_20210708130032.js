import React from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '@/sections/StackedLayout'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import SideMenu from '../components/NewSlug/SideMenu'

const NewLinkCard = () => {
 

  return (
    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <section aria-labelledby="payment-details-heading">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div>
                <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                  Create New Slug
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your billing information. Please note that updating your location could affect your tax
                  rates.
                </p>
              </div>

              <div className="mt-6 inline-flex justify-between align-stretch">
                <div>
                  <SideMenu /> 
                </div>

                <div>

                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

const NewLinkPage = () => {
  // const [session] = useSession()
  // const email = session && session?.user ? session.user.email : ''
  const email = 'sasagar@ucsd.edu'

  return (
      <StackedLayout 
          pageMeta={{ 
            title: 'Create a new Slug',
            href: '/new' 
          }} 
          children={
            <NewLinkCard email={email} />
          }
      />
  );
};


export default NewLinkPage 

NewLinkPage.auth = false; 