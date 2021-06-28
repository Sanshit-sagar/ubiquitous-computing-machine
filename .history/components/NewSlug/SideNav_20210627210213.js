import React, { useContext } from 'react'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/outline'
import { GlobalStore } from '../../store'

const navigation = [
  { name: 'Basics', href: '#', icon: HomeIcon, current: true },
  { name: 'Expiry', href: '#', icon: FolderIcon, current: false },
  { name: 'Rate Limit', href: '#', icon: CalendarIcon, current: false },
  { name: 'Password', href: '#', icon: InboxIcon, current: false },
  { name: 'Redirects', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
function NewSlugSideNav() {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const handleTabChange = (updatedTab) => {
        dispatch({
            type: 'tab',
            payload: {
                value: updatedTab.name
            }
        });
    }

    return (
        <>
        <nav className="space-y-1" aria-label="Sidebar">
            {navigation.map((item) => (
                <button
                    key={item.name}
                    onClick={handleTabChange}
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
  