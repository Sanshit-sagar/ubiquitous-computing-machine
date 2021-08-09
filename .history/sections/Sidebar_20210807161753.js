

import React, { useContext } from 'react'
import { useRouter } from 'next/router' 
import { styled, darkTheme } from  '../stiches.config'

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
import {blackA, mauve } from '@radix-ui/colors'

const StyledSidebar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'white',
  color: blackA.blackA12,
  border: `thin solid ${mauve.mauve10}`,
  gap: '$3',
  height: '65vh', 
  width: '60px',
  borderRadius: '$3',
  marginTop: '17.5vh',
  paddingTop: '5vh',

  [`.${darkTheme} &`]: {
    backgroundColor: blackA.blackA12,
    color: 'white',
    border: `thin solid silver`,
  },
})


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
        { name: 'Tablelytics', href: '/tablelytics', icon: TableIcon },
    ];

    return (
      <StyledSidebar>
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
                      isPressed={state ? state.currentPage===item.name : false} 
                      handlePress={() => {
                        if(!state) return; 
                        router.push(`${item.href}`)
                      }}
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
        </StyledSidebar>

              
    )
}

export default Sidebar
