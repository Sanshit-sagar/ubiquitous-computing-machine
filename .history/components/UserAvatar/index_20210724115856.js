import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'
import { useSession } from 'next-auth/client'
import Loader from '../Loader'

const UserAvatar = () => {
  const [session, loading] = useSession()

  if(loading || !session) return <Loader /> 
  
  return (
    <Avatar>
      <AvatarImage
        src={session.user?.image || null}
        alt={session.user?.name || ''}
      />

      <AvatarFallback delayMs={600}>
        {session.user?.name ? session.user.name?.substring(0,2) : ''}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;