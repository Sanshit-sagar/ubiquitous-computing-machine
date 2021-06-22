
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

    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    const [session, loading] = useSession()


    const sidebarNavigation = {
        'new': { name: 'New', href: 'new', icon: PlusIcon, current: state.router.current==='new' },
        'clicks': { name: 'Clicks', href: 'clicks', icon: CursorClickIcon, current: state.router.current==='clicks' },
        'saved': { name: 'Saved', href: 'links', icon: CollectionIcon, current: state.router.current==='links' },
    };

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
        <div className="flex-col justify-start items-start">         
           
            <Logo />
            
            <div className="bg-white text-black text-sm font-normal">
                {sidebarNavigation.map( (item, index) => (
                    <div key={index}>
                        return (
                            <button
                                key={item.name}
                                route={item.href}
                                onClick={() => handleNavigation(item.href)}
                            >
                                <item.icon>
                                    <span> {item.name} </span>
                                </item.icon>
                            </button>
                        ); 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar