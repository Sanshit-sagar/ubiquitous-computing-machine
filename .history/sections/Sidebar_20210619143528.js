
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


const Sidebar = ({ }) => {

    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    const [session, loading] = useSession()


    const sidebarNavigation = [
        { name: 'New', href: 'new', icon: PlusIcon, current: state.router.current==='new' },
        { name: 'Clicks', href: 'clicks', icon: CursorClickIcon, current: state.router.current==='clicks' },
        { name: 'Saved', href: 'links', icon: CollectionIcon, current: state.router.current==='links' },
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
        <div className="w-full flex flex-col items-center">         
            <div className="items-center text-white">
                <Logo />
            </div>
            
            <div className="flex-col w-full">
                {sidebarNavigation.map((item) => (
                    <button
                        key={item.name}
                        route={item.href}
                        className={classNames(item.current ? 'text-white': 'text-black bg-white')}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={() => handleNavigation(item.href)}
                    >
                        <item.icon
                            className={classNames(item.current ? 'bg-yellow' : 'text-white h-6 w-6')}
                            aria-hidden="true"
                        >
                            <span className="mt-2"> {item.name} </span>
                        </item.icon>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Sidebar