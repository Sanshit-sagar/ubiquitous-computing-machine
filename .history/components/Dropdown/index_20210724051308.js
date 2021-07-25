import React, { useEffect } from 'react'
import Loader from '../Loader'
import { useSession } from 'next-auth/client'

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
  const [userInitials, setUserInitials] = useState('')
  let initials = 'n/a';

  const label = loading ? <Loader /> : null
  
  useEffect(() => {
    if(!loading && session) {
      let nameArr = session.user.name.split(' ');
      initials = !session.user ? `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}` : '';
    }
    setUserInitials(initials);
  }, [session.user?.name, loading, userInitials, initials]); 

  return (
      <TooltipRoot>

          <TooltipTrigger>
            <Avatar>
              <Image
                src={session.user.image}
                alt={session.user.name}
              />
              <Fallback delayMs={600}>
                {userInitials || '--'}
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
