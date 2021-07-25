import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage
        src={session.user?.image || null}
        alt={session.user?.name || 'N/A'}
      />

      <AvatarFallback delayMs={600}>
        {session.user.name.substring(0,2)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;