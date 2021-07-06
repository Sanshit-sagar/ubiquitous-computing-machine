// import { signIn } from 'next-auth/client'
import { Button } from '@supabase/ui'

function AccessDenied () {
  return (
    <>
      <h1>Access Denied</h1>
      <span>
        <Button 
          type="primary"
          size="large"
          onClick={(e) => {
             router.push('/api/auth/signin')
          }}
        >
          Sign In
        </Button>
      </span>
    </>
  )
}

export default AccessDenied