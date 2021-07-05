
import React from 'react'

import {
  CollectionIcon,
  PlusIcon,
  CursorClickIcon,
  ChartSquareBarIcon,
  PresentationChartLineIcon
} from '@heroicons/react/outline'


const Sidebar = ({ handleNavigation }) => {
    const sidebarNavigation = [
        { name: 'New', href: '/new', icon: PlusIcon },
        { name: 'Clicks', href: '/dashboard', icon: CursorClickIcon },
        { name: 'Saved', href: '/links', icon: CollectionIcon },
        { name: 'Dashboard', href: '/dashboard2', icon: ChartSquareBarIcon },
        { name: 'Leaderboard', href: '/leaderboards2', icon: PresentationChartLineIcon },
    ];

    return (
      <div className="flex flex-col w-20 rounded-md">
        <div className="flex flex-col flex-1 bg-gray-600">
          <div className="flex-1 flex flex-col">
             
            <nav aria-label="Sidebar" className="py-6 flex flex-col items-center space-y-3">
              {sidebarNavigation.map((item) => (
                <button
                  key={item.name}
                  className={item.current ? 'bg-red' : 'bg-green' + "flex items-center p-4 rounded-lg text-green-200 hover:bg-blue-400 hover:text-blue-800 hover:focus-ring-yellow"}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-6 w-6" />
                </button>
              ))}
            </nav>

          </div>
        </div> 
      </div>
    )
}

export default Sidebar