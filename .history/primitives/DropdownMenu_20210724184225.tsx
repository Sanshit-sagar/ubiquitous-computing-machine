import React from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { styled } from '@stitches/react';

import { violet, blackA, mauve } from '@radix-ui/colors'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSession, signIn, signOut } from 'next-auth/client'
import { HamburgerMenuIcon, HomeIcon, GearIcon, ExitIcon, DotFilledIcon } from '@radix-ui/react-icons'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Avatar, AvatarImage, AvatarFallback  } from '../primitives/Avatar'

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
  minWidth: '200px',
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 5px 15px -5px rgba(0,255,0,0.2)',
});

export const StyledItem = styled(DropdownMenu.Item, {
  padding: '8px 10px',
  borderRadius: 3,
  cursor: 'default',
  width: '200px',
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'stretch',

  '&:focus': {
    outline: 'none',
    backgroundColor: blackA.blackA12,
    color: '#fff',
  },
});

export const StyledSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: blackA.blackA12,
  margin: 5,
});


export const StyledArrow = styled(DropdownMenu.Arrow, {
  fill: 'black',
});

const StyledLabel = styled(DropdownMenu.Label, {
  paddingLeft: '15px',
  fontSize: '12px',
  lineHeight: '25px',
  color: mauve.mauve11,
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
            <div> {
                   session && !loading ? `${session.user.name.split(' ')[0]}` 
                : !session || !loading ? 'Signed Out' 
                : '...' 
              } 
            </div>
            <div style={{ marginLeft: '10px', padding: '5px' }}>  
              <HamburgerMenuIcon /> 
            </div>
          </div>
        </DropdownMenu.Trigger>
        
        <StyledContent sideOffset={5} align="end">

          <StyledItem onSelect={() => console.log(`Clicked on the profile item`)}>
            <DropdownMenu.RadioItem value={'string'} as={'div'}>
              <Flex css={{ justify: 'between', align: 'stretch', gap: '10px' }}>
                <DropdownMenu.ItemIndicator as={'div'}>
                  { session && !loading ? <DotFilledIcon /> : null }
                </DropdownMenu.ItemIndicator>
              </Flex>

              <Box css={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}> 
                <> { session && session.user ? 
                  <Flex css={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <Avatar>
                      <AvatarImage
                        src={session.user.image} 
                        alt={session.user.name} 
                      />
                      <AvatarFallback 
                        initial={<Loader />} 
                        as={'css'}
                        delayMs={600} 
                      />
                    </Avatar>

                    <Flex css={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text>
                        { 
                            session && !loading ? `${session.user.name}` 
                          : !loading ? `Signed Out` 
                          : `loading...` 
                        }
                      </Text>
                      
                      <Text css={{ fontSize: '10px', fontColor: '#338'}}>
                        { 
                            session && !loading  
                          ? `${session.user.email.substring(0,50)}${session && session.user && (session.user.email?.length >= 50) ? `...` : ''}` 
                          : null 
                        } 
                      </Text>
                    </Flex>
                  </Flex>
                 : null } </>
              </Box>

            </DropdownMenu.RadioItem>
          </StyledItem>

          <StyledSeparator />
          <StyledLabel as={'span'}>
            Actions
          </StyledLabel>

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