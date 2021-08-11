

import React, { useContext } from 'react'
import { useRouter } from 'next/router' 
import { styled } from  '../stiches.config'

import { GlobalStore } from '../store'
import ToggleButton from '../primitives/Toggle'
import StyledTooltip from '../primitives/Tooltip'

import { Text } from '../primitives/Text'
import { AccessibleIcon } from '../primitives/AccessibleIcon'
import { 
  FilePlusIcon, 
  TableIcon, 
  DashboardIcon, 
  BarChartIcon, 
  GearIcon
} from '@radix-ui/react-icons'
import { darkTheme, theme as lightTheme } from '../stiches.config'

const StyledSidebar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '$loContrast',
  color: '$hiContrast',
  border: `thin solid`,
  borderColor: '$hiContrast',
  gap: '$3',
  height: '65vh', 
  width: '60px',
  borderRadius: '$3',
  marginTop: '17.5vh',
  paddingTop: '5vh',
})

const SidebarIcon = ({ icon, label, invert }) => {

  return (
      <AccessibleIcon label={label} css={{ color: 'red' }}>
        {icon}
      </AccessibleIcon>
  );
}

const Sidebar = () => {
    const router = useRouter(); 
    const uiState = useContext(GlobalStore.State)

    const sidebarNavigation = [
        { name: 'Create', href: '/new', icon: <FilePlusIcon /> },
        { name: 'Clickstream', href: '/clickstream', icon: <TableIcon /> },
        { name: 'Dashboard', href: '/dashboard', icon: <BarChartIcon /> },
        { name: 'Analytics', href: '/visualizer', icon: <DashboardIcon /> },
        { name: 'Account', href: '/account', icon: <GearIcon />},
    ];

    return (
      <div className={uiState.darkMode ? darkTheme : lightTheme}>
        
        <StyledSidebar>
            {sidebarNavigation.map(function(item, index) {
                return (
                  <StyledTooltip 
                    content={<Text>{item.name}</Text>}
                    defaultOpen={false}
                    key={index}
                  > 
                  <button>
                    <ToggleButton
                      isPressed={uiState ? uiState.currentPage===item.name : false} 
                      handlePress={() => {
                        if(!uiState) return; 
                        router.push(`${item.href}`)
                      }}
                      pressedElem={
                        <SidebarIcon 
                          icon={item.icon} 
                          label={item.name}
                          invert={true} 
                        />
                      }
                      unpressedElem={
                        <SidebarIcon 
                          icon={item.icon} 
                          label={item.name} 
                          invert={false}
                        />
                      }
                    />
                    </button>
                  </StyledTooltip>
                );
            })}
          </StyledSidebar>
        </div>
              
    )
}

export default Sidebar
