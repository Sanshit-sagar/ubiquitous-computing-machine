

import React, { useContext } from 'react';
// import useSWR from 'swr'
// import { fetcher } from '../../lib/utils'
// import toast from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { GlobalStore } from '../store';
// import Breadcrumbs from '../components/Breadcrumbs';
import { formatPathAsMenuHeader } from '../lib/utils'

import { 
    CreditCardIcon, 
    KeyIcon, 
    UserCircleIcon, 
    UserGroupIcon, 
    ViewGridAddIcon, 
    ChevronLeftIcon 
} from '@heroicons/react/outline'

const menuItems = [
  { name: 'Basic Details', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Expiration (TTL)', href: '#', icon: KeyIcon, current: false },
  { name: 'SEO & UTM Tags', href: '#', icon: CreditCardIcon, current: false },
  { name: 'A/B Testing', href: '#', icon: UserGroupIcon, current: false },
  { name: 'IP Blacklist', href: '#', icon: ViewGridAddIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SecondarySidebar = () => {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <div className="h-screen flex overflow-hidden border-l-2 border-gray-700">
            <div className="flex xl:overflow-hidden">

                <nav
                    aria-label="Sections"
                    className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
                >
                    <div className="flex-col items-center justify-start h-16 px-6 border-b border-blue-gray-200">
                        <p className="text-lg font-medium text-blue-gray-900">
                           {formatPathAsMenuHeader(state.router.current)}
                        </p>
                        <p className="text-xs font-extralight text-gray-500">
                            {state.router.history.map((value, index) => {
                                 return (
                                    <div key={index} className="inline-flex flex-wrap text-gray-800 text-xs font-extralight">
                                    
                                            <p>{`${value.route.substring(0, 10)} > `}</p> 
                                    </div>    
                                 );                           
                            })}
                        </p>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                                    'flex p-6 border-b border-blue-gray-200'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >

                            <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400" aria-hidden="true" />
                                <div className="ml-3 text-sm">
                                    <p className="font-medium text-blue-gray-900">{item.name}</p>
                                    <p className="mt-1 text-blue-gray-500">{item.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </nav>

            </div>
        </div>
    )
}

export default SecondarySidebar