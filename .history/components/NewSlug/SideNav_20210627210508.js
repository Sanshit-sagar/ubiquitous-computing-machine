import React, { useContext } from 'react'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/outline'
import { GlobalStore } from '../../store'

const navigation = [
  { name: 'Basics', id: 'basic', icon: HomeIcon, current: true },
  { name: 'Expiry', id: 'expiry', icon: FolderIcon, current: false },
  { name: 'Rate Limit', id: 'ratelimit', icon: CalendarIcon, current: false },
  { name: 'Password', id: 'password', icon: InboxIcon, current: false },
  { name: 'Redirects', id: 'redirect', icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
function NewSlugSideNav() {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const handleTabChange = (updated) => {
        dispatch({
            type: 'tab',
            payload: {
                value: updatedTab.id
            }
        });
    }

    return (
        <>
        <nav className="space-y-1" aria-label="Sidebar">
            {navigation.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleTabChange(item.name)}
                    href={item.href}
                    className={classNames(
                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    <item.icon
                            className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    
                    <span className="truncate">
                        {item.name} 
                    </span>
                </button>
            ))}
        </nav>

        <h1> {state.currentTab} </h1>
        </>
    );
}



export default NewSlugSideNav
  