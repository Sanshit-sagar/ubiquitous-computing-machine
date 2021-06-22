
import React, { useContext } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import toast from 'react-hot-toast'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
} from '@heroicons/react/outline'

import { GlobalStore } from '../store'
// import Logo from '../components/Logo'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  


const Sidebar = ({ }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    
    const sidebarNavigation = [
        { name: 'New', href: '/new', icon: PlusIcon, current: true },
        { name: 'Clicks', href: '/clicks', icon: CursorClickIcon, current: false },
        { name: 'Saved', href: '/links', icon: CollectionIcon, current: false },
    ];

    const handleNavigation = (route) => {
        if(route !== state.router.current) {
            dispatch({
                type: 'navigate',
                payload: {
                    key: `/${route}`,
                }
            });
            router.push(`/${route}`)
            toast.success(`Navigated to ${state.router.current}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }


    return (
    <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
        <div className="relative w-20 flex flex-col p-3 space-y-3">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
              )}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        {session && session.user && 
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 group block">
                {/* <div className="flex items-center"> */}
                    <div>
                        <img className="inline-block h-10 w-10 rounded-full" src={session.user.image} alt="" />
                    </div>
                    {/* <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{session.user.name}</p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Account Settings</p>
                    </div>
                </div> */}
            </a>
        </div>}
    </nav>

    )
}

export default Sidebar