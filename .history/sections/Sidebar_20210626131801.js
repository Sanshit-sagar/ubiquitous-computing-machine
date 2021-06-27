
import React, { useContext } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import toast from 'react-hot-toast'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  UserIcon, 
  HomeIcon,
  ChartSquareBarIcon
} from '@heroicons/react/outline'
import { Windmill } from '@windmill/react-ui'

import { GlobalStore } from '../store'
import Logo from '../components/Logo'
import NotificationBell from '../components/NotificationBell/index'
import ProfileMenu from '../components/ProfileMenu/index'

function isCurrentPage(pageId) {
  const state = useContext(GlobalStore.State)
  return (
    pageId === state.router.current || pageId===state.router.current.substring(1)
  );
}


const Sidebar = ({ handleNavigation }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    
    const sidebarNavigation = [
        { name: 'New', href: '/new', icon: PlusIcon, current: isCurrentPage('new') },
        { name: 'Clicks', href: '/dashboard', icon: CursorClickIcon, current: isCurrentPage('new') },
        { name: 'Saved', href: '/links', icon: CollectionIcon, current: isCurrentPage('new') },
        { name: 'Dashboard', href: '/dashboard2', icon: ChartSquareBarIcon, current: isCurrentPage('new') },
    ];


    return (
        <div className="flex flex-col w-20 rounded-md">
          <div className="flex flex-col h-0 flex-1 overflow-y-auto bg-gray-600">
            <div className="flex-1 flex flex-col">
             
              <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                {sidebarNavigation.map((item) => (
                  <button
                    key={item.name}
                    className={item.current ? 'bg-red' : 'bg-green' + "flex items-center p-4 rounded-lg text-green-200 hover:bg-blue-400 hover:text-blue-800 hover:focus-ring-yellow"}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="h-6 w-6" />
                    
                  </button>
                ))}
              </nav>

            </div>

          </div> 
        </div>

    )
}

export default Sidebar