import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'
import { useSession } from 'next-auth/client'
import Loader from '../Loader'
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
       

      <AvatarFallback delayMs={600}>SS</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;

// <> 
// {session && session?.user ? 
//   <AvatarImage
//     src={session.user.image}
//     alt={session.user.name}
//     onLoadingStatusChange={(status) => handleLoadingStatusUpdate(status)}
//   /> 
// : <p> nahh </p> } 
// </>