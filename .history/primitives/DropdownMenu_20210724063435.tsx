import { styled } from '@stitches/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { violet, blackA } from '@radix-ui/colors';
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import { useSession, signIn, signOut } from 'next-auth/client'

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


const Dropdown = ({ label, item1, item2, item3 }) => {
  const [session, loading] = useSession(); 

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
              <span> 
                { 
                  session && !loading ? 
                  <ProfileAvatar name={session.user.name} image={session.user.image} loading={loading} /> : null
                }
              </span>
              <span className="text-sm font-md"> 
                { session && !loading ? `${session.user.name}` : !loading ? `Signed Out` : `loading...` } 
              </span>
          </StyledItem>

          <StyledSeparator />

          <StyledItem onSelect={() => console.log(`Selected ${item1.title}`)}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <HomeSvg /> 
              </span>
              <span className="text-sm font-extralight"> 
                Account 
              </span>
            </span>
          </StyledItem>

          <StyledItem onSelect={() => console.log(`Selected ${item2.title}`)}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <GearSvg /> 
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
                  <ExitSvg /> 
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