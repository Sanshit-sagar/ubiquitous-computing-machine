

import React from 'react';
// import useSWR from 'swr'
// import { fetcher } from '../../lib/utils'
// import toast from 'react-hot-toast';
// import { useSession } from 'next-auth/client';
// import { GlobalStore } from '../../store';

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

const SecondaryMenu = () => {

    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current
                            ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                            : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                            'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <item.icon
                            className={classNames(item.current
                                ? 'text-indigo-500 group-hover:text-indigo-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                )}
                            aria-hidden="true"
                        />
                        <span className="truncate">
                            {item.name}
                        </span>
                    </a>
                ))}
            </nav>
        </aside>
    )
}

export default SecondaryMenu