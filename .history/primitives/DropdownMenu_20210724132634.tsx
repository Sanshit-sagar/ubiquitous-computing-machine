import React from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { violet, blackA } from '@radix-ui/colors';

import { HamburgerMenuIcon, HomeIcon, GearIcon, ExitIcon } from '@radix-ui/react-icons'
import { useSession, signIn, signOut } from 'next-auth/client'

import UserAvatar from '../components/UserAvatar'
import { styled, keyframes } from '@stitches/react';

const IconButton = styled('button', {
  appearance: 'none',
  backgroundColor: 'white',
  padding: '6.5px',
  boxShadow: 'inset 0 0 0 1px gainsboro',
  overflow: 'hidden',
  borderRadius: '4px',
  marginLeft: '10px',
  
  '&:focus': {
    outline: 'none',
    border: 'none',
  },

  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: violet.violet12,
    color: 'white',
  },
});

export const StyledContent = styled(DropdownMenu.Content, {
  minWidth: '150px',
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 5px 15px -5px rgba(0,255,0,0.2)',
});

export const StyledItem = styled(DropdownMenu.Item, {
  padding: '8px 10px',
  borderRadius: 3,
  cursor: 'default',
  width: '150px',
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'stretch',

  '&:focus': {
    outline: 'none',
    backgroundColor: blackA.blackA2,
    color: blackA.blackA12,
  },
});

export const StyledSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
});


export const StyledArrow = styled(DropdownMenu.Arrow, {
  fill: 'white',
});

function isPathValid(path) {
  // double check this
  return path && path?.length; 
}


const Dropdown = ({ label }) => {
  const router = useRouter(); 
  const [session, loading] = useSession(); 

  const handleNavigation = (destination) => {
    if(isPathValid(destination) && session.user?.name.length) {
      router.push(`${destination}`);
      toast.success(`Navigating to ${destination}`);
    } else {
      router.push(`Failed to navigate to ${destination} since it's not a valid path`);
    }
  }

  return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger as={IconButton}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div> {label} </div>
            <div style={{ marginLeft: '10px', padding: '5px' }}>  
              <HamburgerMenuIcon /> 
            </div>
          </div>
        </DropdownMenu.Trigger>
        
        <StyledContent sideOffset={5} align="end">

          <StyledItem onSelect={() => console.log(`Clicked on the profile item`)}>
              <div> 
                { 
                  session && !loading ? 
                  <UserAvatar name={session.user.name} image={session.user.image} loading={loading} /> : null
                }
              </div>
              <div className="text-sm font-md"> 
                <div>{ session && !loading ? `${session.user.name}` : !loading ? `Signed Out` : `loading...` } </div>
                <div>{ session && !loading ? `${session.user?.name}` : ''} </div>
              </div>
          </StyledItem>

          <StyledSeparator />

          <StyledItem onSelect={() => handleNavigation('account')}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <HomeIcon /> 
              </span>
              <span className="text-sm font-extralight"> 
                Account 
              </span>
            </span>
          </StyledItem>

          <StyledItem onSelect={() => handleNavigation('settings')}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <GearIcon /> 
              </span>
              <span className="text-sm font-extralight"> 
                Settings 
              </span>
            </span>
          </StyledItem>

          <StyledSeparator />

          <StyledItem 
            onSelect={() => {
              if(session && !loading) {
                signOut();
              } else {
                signIn(); 
              }
            }}
          >
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                <span className="text-red-500"> 
                  <ExitIcon /> 
                </span>
                <span className="text-sm font-extralight text-red-500"> 
                  Logout 
                </span>
            </span>
          </StyledItem>

          <StyledArrow />
        </StyledContent>
      </DropdownMenu.Root>
  );
}

export default Dropdown