import { signIn } from 'next-auth/client'

const Unauthenticated = () => {
  return (
    <div>
      <p>You are not authenticated</p>
      <button onClick={signIn}> Sign In </button>
    </div>
  )
}

export default Unauthenticated