import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Button } from '@supabase/ui'

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
            layout="outline"
            disabled={loading} 
            onClick={() => {
                router.push(session && session.user ? 'api/auth/signin' : 'api/auth/signout')
            }}
        >
            { 
                    loading ? <Loader />  
                :   session && session.user 
                    ? 
                        <>
                        <LogoutIconSvg />  
                        <span className="text-white font-sm font-extralight"> Logout </span>
                        </>
                :  
                    <>
                    <KeyIconSvg className="h-6 w-6 text-green-400" /> 
                    <span className="text-white font-sm font-extralight"> Login </span>
                    </>
            }
        </Button>
    );
}

export default AuthButton