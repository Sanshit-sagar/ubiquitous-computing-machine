import { styled } from '@stitches/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { violet, blackA } from '@radix-ui/colors';
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useSession, signIn, signOut } from 'next-auth/client'
import ProfileAvatar from './Avatar'
import toast from 'react-hot-toast'

export const IconButton = styled('button', {
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

export const ExitSvg = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}

export const GearSvg = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}

export const HomeSvg = () => {

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  );
}
export const DotFilledSvg = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor"></path></svg>
  )
}
export const DotEmptySvg = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}

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
                { session && !loading ? 
                  <ProfileAvatar 
                    name={session.user.name} 
                    image={session.user.image} 
                    loading={loading} 
                  /> 
                  : 
                  null 
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
                <span className="text-red-500"> <ExitSvg /> </span>
                <span className="text-sm font-extralight text-red-500"> Logout </span>
            </span>
          </StyledItem>

          <StyledArrow />
        </StyledContent>
      </DropdownMenu.Root>
  );
}

export default Dropdown