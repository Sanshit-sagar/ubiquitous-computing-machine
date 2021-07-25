import React, { useContext } from 'react'
import Dropdown from '../../primitives/DropdownMenu'
import { Button } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow, Image, Fallback, Avatar }


const ProfileAvatar = () => {
  const [session, loading] = useSession()

  if(!session && !loading) return <p> Error! </p>

  return (
      <TooltipRoot>
          <TooltipTrigger>
            <Avatar onClick={() => alert('Clicked!')}>
                <Image src={image} />
                <Fallback>
                    <Loader /> 
                </Fallback>
            </Avatar>
          </TooltipTrigger>

          <StyledTooltipContent side="top">
              {name}
              <TooltipArrow style={{ fill: violet.violet10 }} />
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
