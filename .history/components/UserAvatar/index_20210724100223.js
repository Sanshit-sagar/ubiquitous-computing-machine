import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />

      <AvatarFallback delayMs={600}>
        CT
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;