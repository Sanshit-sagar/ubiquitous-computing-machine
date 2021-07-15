import React, { useEffect } from 'react';
import { signIn, useSession } from "next-auth/client"
import Loader from '../Loader'

const AuthListener = ({ children }) => {
    const [session, loading] = useSession()
    const isUser = !!session?.user
    
    useEffect(() => {
      if (loading) return  <Loader />;
      if (!isUser) signIn() 
    }, [isUser, loading])
  
    if (isUser) {
      return children
    }
  
    return <Loader />;
}

export default AuthListener