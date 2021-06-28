import React from "react"
import { Provider, signIn, useSession } from "next-auth/client"

import Loader from '../Loader'

const AuthWrapper = ({ children }) => {
    const [session, loading] = useSession()

    const isUser = !!session?.user

    useEffect(() => {
       if(!loading && !session) {
           signIn(); 
       }
    }, [isUser, loading]);

    return isUser ? <>{children}</> : <Loader /> 
}

export default AuthWrapper


