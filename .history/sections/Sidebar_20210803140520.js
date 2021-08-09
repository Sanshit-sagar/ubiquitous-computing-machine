

import React, { useContext } from 'react'
import { useRouter } from 'next/router' 

import { GlobalStore } from '../store'
import ToggleButton from '../primitives/Toggle'
import StyledTooltip from '../primitives/Tooltip'
import { 
  FilePlusIcon, 
  CursorArrowIcon, 
  TableIcon, 
  DashboardIcon, 
  BarChartIcon, 
  GearIcon
} from '@radix-ui/react-icons'


const Sidebar = ({ handleNavigation }) => {

    const router = useRouter(); 
    const state = useContext(GlobalStore.State)

    const sidebarNavigation = [
        { name: 'Create', href: '/new', icon: FilePlusIcon },
        { name: 'Clickstream', href: '/clickstream', icon: CursorArrowIcon },
        { name: 'Your Links', href: '/links', icon: TableIcon },
        { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
        { name: 'Analytics', href: '/visualizer', icon: BarChartIcon },
        { name: 'Account', href: '/account', icon: GearIcon },
        // { name: 'Tablelytics', href: '/tablelytics', icon: TableIcon },
    ];

    return (
      <div className="h-full flex-col w-18 rounded-md">
        <div className="h-full flex-col flex-1">
          <div className="h-full flex-1 flex flex-col">
             
            <nav aria-label="Sidebar" className="h-full mt-5 mb-5 py-6 flex flex-col items-center space-y-3 rounded-md shadow-lg bg-white">
              {sidebarNavigation.map(function(item, index) {
                  return (
                    <StyledTooltip 
                      content={
                        <span className="text-sm font-extralight"> 
                          {item.name}
                        </span>
                      }
                      defaultOpen={false}
                      key={index}
                    > 
                      <button>
                        <ToggleButton
                          isPressed={state.currentPage===item.name} 
                          handlePress={() => router.push(`${item.href}`)}
                          pressedElem={
                            <span className="text-sm font-extralight text-black">
                              <item.icon />
                            </span>
                          }
                          unpressedElem={<item.icon />}
                        />
                      </button>
                    </StyledTooltip>
                  );
              })}
             </nav>
          </div>
        </div> 
      </div>
    )
}

export default Sidebar
