import React from 'react'

import { LoadingSpinner } from '../Loader'
import { useSession } from 'next-auth/client'
import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'

import toast from 'react-hot-toast'

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
        <LoadingSpinner />
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
