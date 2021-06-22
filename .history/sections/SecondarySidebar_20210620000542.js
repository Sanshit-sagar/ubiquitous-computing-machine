

import React from 'react';
// import useSWR from 'swr'
// import { fetcher } from '../../lib/utils'
// import toast from 'react-hot-toast';
// import { useSession } from 'next-auth/client';
// import { GlobalStore } from '../../store';
import Breadcrumbs from '../components/Breadcrumbs';

import { 
    CreditCardIcon, 
    KeyIcon, 
    UserCircleIcon, 
    UserGroupIcon, 
    ViewGridAddIcon, 
    // SaveIcon 
} from '@heroicons/react/outline'

const navigation = [
  { name: 'Basic Details', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Expiration (TTL)', href: '#', icon: KeyIcon, current: false },
  { name: 'SEO & UTM Tags', href: '#', icon: CreditCardIcon, current: false },
  { name: 'A/B Testing', href: '#', icon: UserGroupIcon, current: false },
  { name: 'IP Blacklist', href: '#', icon: ViewGridAddIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MenuHeader = () => {

    return (
        <span className="bg-black text-white p-1 border-solid border-r-2 border-b-2 border-gray-700 font-extralight">
            <h1> Heading here </h1>
            <subtitle> subheading here </subtitle>
            <br /> 
        </span>
    )
}

const SecondarySidebar = () => {

    return (
        <div className="h-screen flex overflow-hidden border-l-2 border-gray-700">
            <div className="flex xl:overflow-hidden">
                
            
                <div className="flex-shrink-0 bg-blue-700 py-4 flex items-center justify-center">
                    <p className="text-lg font-extralight text-white hover:text-blue-500">Settings</p>
                </div>

                <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                        >
                            <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-white" aria-hidden="true" />
                            <div className="ml-3 text-sm">
                                <p className="text-white">{item.name}</p>
                                <p className="mt-1 text-white">{item.description}</p>
                            </div>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default SecondarySidebar