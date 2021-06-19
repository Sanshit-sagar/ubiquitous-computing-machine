import React, { useState, useContext } from 'react'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/solid'
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

    // const pages = [
    //     { 
    //       name: session && !loading ? session.user.email : '...', 
    //       href: session && !loading ? `>/${session.user.email }` : '...',
    //       current: false 
    //     },
    //     { 
    //       name: state.router.current,
    //       href: HREF_FOR_PATH[`${state.router.current}`] || '/', 
    //       current: true 
    //     },
    // ]; 

    return (
      <div className="hover:bg-white">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-white text-lg font-light hover:text-gray-50">
                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
            { loading ? <CustomSpinner /> : 
              <div className="flex">
                {Object.entries(state.router.breadcrumbs).map(function(crumb, ind, arr) {
                  <li key={crumb.name}>
                    <div className="flex items-center">
                      <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <a
                        href={crumb.href}
                        className="ml-2 mb-1 mt-1 text-md font-lightest text-gray-50 hover:pulse"
                        aria-current={page.current ? 'page' : undefined}
                      >
                        {crumb.name}
                      </a>
                    </div>
                  </li>
                })}
              </div>
            }
          </ol>
        </nav>
      </div>
    );
}

export default Breadcrumbs