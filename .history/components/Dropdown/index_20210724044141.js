import React, { useContext } from 'react'
import Dropdown from '../../primitives/DropdownMenu'
import { Button } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'
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
    label = !session.user ? <Text> {session.user.name.split(' ')[0]} </Text>  : 'RD';

    return (
        <TooltipRoot>
            <TooltipTrigger>
              <Avatar onClick={() => alert('Clicked!')}>
                  <Image src={session.user.image} />
                  <Fallback>
                      <Loader /> 
                  </Fallback>
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
