import React, { useState } from 'react'
import { useSession } from 'next-auth/client'
import toast from 'react-hot-toast'

import Loader from '../Loader'
import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'

function getInitials(name) {
  let nameArr = name.split(' ');  
  if(!nameArr.length) return '';

  let firstInitial = nameArr[0].charAt(1);
  let secondInitial = nameArr[1]?.charAt(1) || ' '
  let initialsStr = `${firstInitial}${secondInitial}`

  return initialsStr.toUpperCase(); 
}

const UserAvatar = () => {
  const [session, loading] = useSession()

  const handleLoadingStatusUpdate = (status) => {
    toast.success(`Loading status changed to ${status}`);
  }

  if(loading) return <Loader />;
  if(!session && !loading) return <p> Error! </p>;
  
  return (
    <Avatar>
      <> 
        {session && session?.user ? 
          <AvatarImage
            src={session.user.image}
            alt={session.user.name}
            onLoadingStatusChange={(status) => handleLoadingStatusUpdate(status)}
          /> 
        : null } 
      </>
      <AvatarFallback delayMs={600}>
        {getInitials(session.user.name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
