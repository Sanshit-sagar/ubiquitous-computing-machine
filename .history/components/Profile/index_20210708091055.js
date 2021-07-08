import { useSession } from 'next-auth/client'
import dynamic from 'next/dynamic'

const UnauthenticatedComponent = dynamic(() =>
  import('../AccessDenied')
)
const Loader = dynamic(() => 
  import('../Loader')
)

function Profile() {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return <Loader /> 
  if (!session) return <UnauthenticatedComponent />
  return <AuthenticatedComponent user={session.user} />
}

export default Profile