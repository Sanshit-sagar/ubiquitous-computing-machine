
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
import Logo from '../components/Logo'

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
    <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:bg-black md:overflow-y-auto border-white">
        

        <div className="relative w-15 flex flex-col space-y-3">
            <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
                <a
                    href="#"
                    className="flex items-center justify-center h-20 w-15 bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                    <Logo />
                </a>
            </div>
            
            {sidebarNavigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700',
                        'flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-sm m-2'
                    )}
                >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
            ))}
        </div>
        {/* <div className="flex-col justify-end align-center">
            {session && session.user && 
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="/profile" className="flex-shrink-0 group block">
                    <img className="inline-block h-10 w-10 rounded-full" src={session.user.image} alt="" />
                </a>
            </div>}
        </div> */}
    </nav>

    )
}

export default Sidebar