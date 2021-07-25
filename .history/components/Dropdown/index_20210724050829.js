import React from 'react'
import { useSession } from 'next-auth/client'
import Loader from '../Loader'


import Dropdown from '../primitives/DropdownMenu'
import { 
  Image, 
  Fallback, 
  Avatar, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipArrow 
} from '../Tooltip'


const ProfileAvatar = () => {
  const [session, loading] = useSession() 

  const label = loading ? <Loader /> : null
  
  if(!loading) {
    let nameArr = session.user.name.split(' ');
    let initials = !session.user ? `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}` : '';
  }

  return (
      <TooltipRoot>
          <TooltipTrigger>
            <Avatar>

              <AvatarImage
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                alt="Pedro Duarte"
              />
              <AvatarFallback delayMs={600}>
                JD
              </AvatarFallback>

            </Avatar>
          </TooltipTrigger>

          <TooltipContent side="top">
              <Text> {label} </Text>
              <TooltipArrow style={{ fill: violet.violet10 }} />
          </TooltipContent>
      </TooltipRoot>
  ); 
}


const DropdownMenu = () => {
  

  
  return (
    <Dropdown /> 
  );
}

export default ProfileAvatar
