import React, { useState, useContext } from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'

const mapHistoryToHref = {
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
          href: '/', 
          current: false 
        },
        { 
          name: state.router.history[state.router.history.length - 1] || 'N/A', 
          href: mapHistoryToHref[`${state.router.history[-1]}`] || '/', 
          current: true 
        },
    ]; 

    return (
      
        <nav aria-label="breadcrumb" className="inline-flex justify-items-start align-center"> 
          <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
          <h3> / </h3>
          <a href='/' className="text-gray-600 hover:text-purple-700 mx-3"> Home </a> 
      

          <ol className="inline-flex justify-items-start align-center">
            {pages.map(function(page, i) {
              <li key={page.name} class="breadcrumb-item text-gray-600">
                <a href="#" className="text-gray-600 hover:text-purple-700 mx-3">
                  { page.name && page.name.length > 1 ? 
                    page.name.charAt(0)==='/' ? `${page.name.charAt(1).toUpperCase()}${page.name.substring(2)}` : page.name
                    : 'N/A'
                  }
                </a>
              </li>
            })}
            <h3> / </h3>
          </ol>

        </nav>
    )
}

export default Breadcrumbs