import React, { useContext } from 'react'
import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'

import { formatPathAsMenuHeader } from '@/lib/utils'

import { 
  CursorClickIcon, 
  LinkIcon, 
  HomeIcon, 
  SaveIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

const nav = {
  'home': { id: 1, title: 'Dashboard', icon: HomeIcon, children: home_submenu, href: '/home' },
  'new': { id: 2,  title: 'Create Slug', icon: LinkIcon, children: new_submenu, href: '/new'},
  'links': { id: 3, title: 'Collection', icon: SaveIcon, children: links_submenu, href: '/links' },
  'clicks': { id: 4, title: 'Click Stream', icon: CursorClickIcon, children: clicks_submenu, href: '/clicks' },
}; 

const home_submenu = {};
const new_submenu = {};
const links_submenu = {};
const clicks_submenu = {}; 

function Breadcrumbs() {
  const [session, loading] = useSession()

  const state = useContext(GlobalStore.State)
  const dispatch = useContext(GlobalStore.Dispatch)

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {state.router.history.map((page, index, pages) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a
                href={page.href}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {formatPathAsMenuHeader(page.route)}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs


