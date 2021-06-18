import { signIn } from 'next-auth/client'
import ActiveLink from '../../buildingBlocks/ActiveLink'

function AccessDenied () {
  return (
    <>
        <h1>
            Access Denied
        </h1>
        <ActiveLink 
            href='/api/auth/signin' 
            onClick={(e) => {
                e.preventDefault()
                signIn()
            }}
        >
            You must be signed in to view this page
        </ActiveLink>
    </>
  )
}

export default AccessDenied