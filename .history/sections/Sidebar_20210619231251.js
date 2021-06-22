
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
import NotificationBell from '../components/NotificationBell/index'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

const ProfileMenu = () => {
    const [session, loading] = useSession()

    if(loading) return <p> ... </p>
    if(!loading && !session) return <p> !! </p>

    return (
        <div className="h-10 w-10 rounded-sm m-2 text-white hover:bg-gray-700">
            <a href="/profile" className="flex-shrink-0">
                <img 
                    className="inline-block h-10 w-10 rounded-sm" 
                    src={session.user.image} 
                    alt={`${session.user.name}'s Profile}`} 
                />
            </a>
        </div>
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
                
                <ProfileMenu />
            </div>

        </div>
    </nav>

    )
}

export default Sidebar