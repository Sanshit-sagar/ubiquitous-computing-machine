import React from 'react'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/client'
import { Card, Button, Icon, Elevation } from '@blueprintjs/core'
import Loader from '../Loader'

const Greeting = () => {
  const [session, loading] = useSession()

  if(session && session?.user) {
    return  ( 
      <>
       <span className="text-sm font-extralight">
        {loading ? '' : `Hi there, ${session.user.name}` }  
       </span>
       <img src={session.user.image} alt={session.user.email} height={100} width={100} />
       </>
    )
  } 
}

const CallToAction = () => {
    const router = useRouter()
    const [session, loading] = useSession()
  
    return (
      <Card interactive={true} elevation={Elevation.TWO}>
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
                  {
                      session && session.user ? <Greeting /> : 
                    
                      <Button
                        size="large"
                        type="outline"
                        iconRight={<Icon icon="login" />}
                        loading={loading}
                        disabled={loading}
                        onClick={() => {
                          router.push('/api/auth/signin')
                        }}
                      >
                        
                          Login
                      </Button>
                  }
              </div>
            </div>
        </Card>
    );
  }
  
  export default CallToAction