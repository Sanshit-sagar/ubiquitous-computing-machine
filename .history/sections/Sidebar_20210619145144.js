
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


    // const sidebarNavigation = {
    //     'new': { name: 'New', href: 'new', icon: PlusIcon, current: state.router.current==='new' },
    //     'clicks': { name: 'Clicks', href: 'clicks', icon: CursorClickIcon, current: state.router.current==='clicks' },
    //     'saved': { name: 'Saved', href: 'links', icon: CollectionIcon, current: state.router.current==='links' },
    // };
    const sidebarNavigation = [
        { name: 'Open', href: '#', icon: InboxIcon, current: true },
        { name: 'Archive', href: '#', icon: ArchiveIcon, current: false },
        { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
        { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
        { name: 'Spam', href: '#', icon: BanIcon, current: false },
        { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
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
    </nav>

    )
}

export default Sidebar