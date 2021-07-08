
import React from 'react'

import { Button } from '@supabase/ui'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  ChartSquareBarIcon,
  PresentationChartLineIcon,
  UserCircleIcon
} from '@heroicons/react/outline'


const Sidebar = ({ handleNavigation }) => {
    const sidebarNavigation = [
        { name: 'New', href: '/new', icon: PlusIcon },
        { name: 'Clicks', href: '/clickstream', icon: CursorClickIcon },
        { name: 'Saved', href: '/links', icon: CollectionIcon },
        { name: 'Dashboard', href: '/dashboard', icon: ChartSquareBarIcon },
        { name: 'Leaderboard', href: '/visualizer', icon: PresentationChartLineIcon },
        { name: 'Account', href: '/account', icon: UserCircleIcon },
    ];

    return (
      <div className="h-full flex-col w-20 rounded-md">
        <div className="h-full flex-col flex-1 bg-gray-600">
          <div className="h-full flex-1 flex flex-col">
             
            <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
              {sidebarNavigation.map((item) => (
                <Button
                  type="outline"
                  size="small"
                  key={item.name}
                  className={item.current ? 'bg-red' : 'bg-green' + "flex items-center p-4 rounded-md text-green-200 hover:bg-blue-400 hover:text-blue-800 hover:focus-ring-yellow"}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-6 w-6 my-1 text-green-300" />
                </Button>
              ))}
            </nav>

          </div>
        </div> 
      </div>
    )
}

export default Sidebar