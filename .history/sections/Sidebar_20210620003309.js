
import React, { useContext } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import toast from 'react-hot-toast'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  UserIcon, 
  HomeIcon
} from '@heroicons/react/outline'

import { GlobalStore } from '../store'
import Logo from '../components/Logo'
import NotificationBell from '../components/NotificationBell/index'
import ProfileMenu from '../components/ProfileMenu/index'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

const ProfileMenu = () => {
    return (
        <button className="flex-shrink-0 ml-1 rounded-sm p-2 text-center items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <span className="sr-only">View notifications</span>
            <UserIcon className="h-8 w-8" aria-hidden="true" />
        </button>
    )
}


const Sidebar = ({ }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    
    const sidebarNavigation = [
        { name: 'Home', href: '/home', icon: HomeIcon, current: false },
        { name: 'New', href: '/new', icon: PlusIcon, current: true },
        { name: 'Clicks', href: '/clicks', icon: CursorClickIcon, current: false },
        { name: 'Saved', href: '/links', icon: CollectionIcon, current: false },
    ];

    const handleNavigation = (route) => {
        if(route !== state.router.current) {
            dispatch({
                type: 'navigate',
                payload: {
                    key: `${route}`,
                }
            });
            router.push(`${route}`)
            toast.success(`Navigated to ${state.router.current}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }


    return (
   
    <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-20">
          <div className="flex flex-col h-0 flex-1 overflow-y-auto bg-blue-600">
            <div className="flex-1 flex flex-col">
              <div className="flex-shrink-0 bg-blue-700 py-4 flex items-center justify-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Workflow"
                />
              </div>

              <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                {sidebarNavigation.map((item) => (
                  <button
                    key={item.name}
                    // href={item.href}
                    className="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </button>
                ))}
              </nav>

            </div>
            
            <div className="flex-col content-end align-center pb-5">
                <ProfileMenu />
            </div>

          </div>
        </div>
      </div>

    )
}

export default Sidebar