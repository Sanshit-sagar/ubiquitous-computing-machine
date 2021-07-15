import React from 'react'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/client'
import { LoginIcon } from '@heroicons/react/solid'
import { Card, Button } from '@blueprintjs/core'
import Loader from '../Loader'

const Greeting = () => {
  const [session, loading] = useSession()

  if(loading) return <Loader />

  if(session && session?.user) {
    return  ( 
     <Card interactive={true} elevation={Elevation.TWO}>
       <span className="text-sm font-extralight">
          Hi there, {session.user.name}  
       </span>
       
      </Card> 
    )
  } 
}

const CallToAction = () => {
    const router = useRouter()
    const [session, loading] = useSession()
  
    return (
        <div h-100 className="dark:bg-gray-700 dark:text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white dark:bg-gray-700 sm:text-4xl">
                <span className="block">
                  Web analytics delivered from the edge
                </span>
                <span className="block text-green-400">
                  cute.ly, secure.ly, analytic.ly, 
                </span>
              </h2>
  
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="m-3 inline-flex rounded-md shadow">
                  {
                      session && session.user ? <Greeting /> 
                    : loading ? <Loader /> 
                    :
                      <Button
                        size="large"
                        type="outline"
                        iconRight={<LoginIcon className="-ml-1 mr-2 h-5 w-5" />}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-md text-lg font-extralight rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        onClick={() => {
                          router.push('/api/auth/signin')
                        }}
                      >
                        
                          Login
                      </Button>
                  }
                </div>
              </div>
            </div>
        </div>
    );
  }
  
  export default CallToAction