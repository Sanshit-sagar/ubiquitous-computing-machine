import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Button } from '@blueprintjs/core'

import { 
    KeyIconSvg, 
    LogoutIconSvg 
} from '../../buildingBlocks/svgIcons'

import Loader from '../Loader'

  
const AuthButton = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    return (
        <Button 
            disabled={loading} 
            onClick={() => {
                router.push(session && session.user ? 'api/auth/signout' : 'api/auth/signin')
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