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
      <div className="shadow bg-white hover:">
        <nav aria-label="breadcrumb" className="inline-flex justify-items-start align-center"> 
          { loading ? <CustomSpinner /> : <HomeIcon className="flex-shrink-0 h-5 w-5 mx-3" aria-hidden="true" /> }
          
          <ol className="inline-flex justify-items-start align-center">
            {pages.map(function(page, i) {
              return (
                <li key={page.name} class="breadcrumb-item text-gray-600">
                  <a href="#" className="text-gray-600 hover:text-purple-700 mx-3">
                    { page.name && page.name.length > 1 ? 
                      page.name.charAt(0)==='/' ? `${page.name.charAt(1).toUpperCase()}${page.name.substring(2)}` : page.name
                      : 'N/A'
                    }
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    )
}

export default Breadcrumbs