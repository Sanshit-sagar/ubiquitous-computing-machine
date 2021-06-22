
import React, { useContext } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import toast from 'react-hot-toast'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  UserIcon
} from '@heroicons/react/outline'

import { GlobalStore } from '../store'
import Logo from '../components/Logo'
import NotificationBell from '../components/NotificationBell/index'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

const ProfileMenu = () => {
    const [session, loading] = useSession()

    if(loading) return <p> ... </p>
    if(!loading && !session) return <p> !! </p>

    return (
        <button className="flex-shrink-0 ml-1 rounded-sm p-2 text-center items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-8 w-8" aria-hidden="true" />
        </button>
    )
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
        

        <div className="h-full w-15 flex flex-col content-between">
            <div className="h-full w-15 flex flex-col space-y-3">
                <a
                    href="/"
                    className="flex items-center justify-center h-15 w-15 p-3 bg-indigo-500"
                >
                    <Logo />
                </a>
            
            
                {sidebarNavigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700',
                            'flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-sm m-2'
                        )}
                    >
                        <item.icon className="h-6 w-6" />
                    </a>
                ))}
            </div>

            <div className="w-15 flex-col justify-between items-stretch">
                <NotificationBell />
            </div>
            
            <div className="w-15 flex-col justify-between items-stretch">
                <ProfileMenu />
            </div>


        </div>
    </nav>

    )
}

export default Sidebar