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


const ProfileAvatar = ({ }) => {
  const [session, loading] = useSession()

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
              {name}let label = !loading ? session && session?.user : session.user.name.split(' ')[0]

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
