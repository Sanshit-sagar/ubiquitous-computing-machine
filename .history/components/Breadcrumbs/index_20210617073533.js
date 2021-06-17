import React, { useState, useContext } from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'
import CustomSpinner from '../../buildingBlocks/Spinner'
import toast from 'react-hot-toast'

const HREF_FOR_PATH = {
  '/new': '/new',
  '/clicks': '/clicks',
  '/links': '/links',
}

function Breadcrumbs() {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)

    const pages = [
        { 
          name: session && !loading ? session.user.email : '...', 
          href: session && !loading ? `>/${session.user.email }` : '...',
          current: false 
        },
        { 
          name: state.router.current,
          href: HREF_FOR_PATH[`${state.router.current}`] || '/', 
          current: true 
        },
    ]; 

    return (
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          { loading ? <CustomSpinner /> : <HomeIcon className="flex-shrink-0 h-5 w-5 mx-3" aria-hidden="true" /> }
            <div className="flex">
              {pages.map(function(page, i) {
                <li key={page.name}>
                  <div className="flex items-center">
                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <a
                      href={page.href}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      aria-current={page.current ? 'page' : undefined}
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              })}
            </div>
          </ol>
        </nav>
    );
}

export default Breadcrumbs