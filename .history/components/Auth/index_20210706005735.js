import React, { useEffect } from 'react';
import { signIn, useSession } from "next-auth/client"
import Loader from '../Loader'

const Auth = ({ children }) => {
    const [session, loading] = useSession()
    const isUser = !!session?.user
    
    useEffect(() => {
      if (loading) return <Loader />
      if (!isUser) signIn() // If not authenticated, force log in
    }, [isUser, loading])
  
    if (isUser) {
      return children
    }
  
    return <Loader /> 
}

export default Auth