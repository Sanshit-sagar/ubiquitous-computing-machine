import React, { useContext } from 'react'
import Dropdown from '../../primitives/DropdownMenu'
import { Button } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'


const ProfileAvatar = () => {
  const [session, loading] = useSession()

  return (
      <Tooltip.Root>
          <StyledTooltipTrigger>
              <StyledAvatar onClick={() => alert('Clicked!')}>
                  <StyledImage 
                      src={image}
                  />
                  <StyledFallback>
                      <Loader /> 
                  </StyledFallback>
              </StyledAvatar>
          </StyledTooltipTrigger>

          <StyledTooltipContent side="top">
              {name}
              <Tooltip.Arrow 
                  style={{ fill: violet.violet10 }} 
              />
          </StyledTooltipContent>
      </Tooltip.Root>
  ); 
}


const DropdownMenu = () => {
  

  let label = loading ? <Loader /> : 
    <span className="text-sm font-extralight"> 
      {session && session?.user ?  session.user.name.split(' ')[0] : 'Login'} 
    </span>; 

  return (
    <Dropdown /> 
  );
}

export default ProfileAvatar
