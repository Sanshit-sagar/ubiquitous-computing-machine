import { signIn } from 'next-auth/client'
import { Button } from '@supabase/ui'

function AccessDenied () {
  return (
    <>
      <h1>Access Denied</h1>
      <span>
        <Button 
          type="primary"
          size="large"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </span>
    </>
  )
}

export default AccessDenied