import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { 
    KeyIconSvg, 
    LogoutIconSvg 
} from '../../buildingBlocks/svgIcons'

  
const AuthButton = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    return (
        <Button 
            layout="outline"
            disabled={loading} 
            onClick={() => {
                router.push(session && session.user ? 'api/auth/signin' : 'api/auth/signout')
            }}
        >
            { 
                    loading ? <Loader />  
                :   session && session.user ? <LogoutIconSvg />  
                :  <KeyIconSvg className="h-6 w-6 text-green-400" /> 
            }
        </Button>
    );
}

export default AuthButton