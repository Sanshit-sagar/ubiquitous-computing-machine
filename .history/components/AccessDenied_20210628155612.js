import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <>
      <h1>Access Denied</h1>
      <span>
        <button href="/api/auth/signin"
           onClick={(e) => {
                e.preventDefault()
                signIn()
        }}>Sign In</button>
      </span>
    </>
  )
}