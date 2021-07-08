import { useSession } from 'next-auth/client'
import dynamic from 'next/dynamic'

const UnauthenticatedComponent = dynamic(() =>
  import('../AccessDenied')
)
const Loader = dynamic(() => 
  import('../Loader')
)

const ProfileDetails = ({ user }) => {

  return (
    <Card>
      <Image
        href={`${user.image}`}
        alt={`${user.name}s profile picture`}
        height={200}
        width={200}
      />
      <Input 
        label="Full Name"
        descriptionText="First and Last Names"
        value={user.name} 
        disabled
      />

      <Input 
        label="E-mail Address"
        value={user.email}
        descriptionText="First and Last Names"
        icon={<IconMail />} 
        disabled
      />
    </Card>
  );
}

const Profile = () => {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return <Loader /> 
  if (!session) return <UnauthenticatedComponent />
  return <ProfileDetails user={session.user} />
}

export default Profile