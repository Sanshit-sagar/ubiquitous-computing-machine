import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { GlobalStore } from '../../store'

import { Card, Button, Icon, Elevation } from '@blueprintjs/core'
import ProfileAvatar from '../../primitives/Avatar'

const Greeting = () => {
  const state = useContext(GlobalStore.State)
  const router = useRouter()
  const [session, loading] = useSession()

  if(session && session?.user) {
    return  ( 
      <Card 
        className={state.darkMode ? 'bp3-dark' : ''}
        interactive={true}
        elevation={Elevation.TWO}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}
      >
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '0px 5px 0px 2px' }}>
          <span className="text-sm font-extralight">
            {loading ? '' : `Hi, ${session.user.name}` }  
          </span>
          <Button 
            loading={loading} 
            disabled={loading} 
            onClick={() => {
              router.push('/profile')
            }}
            rightIcon={<Icon icon="dashboard"  />}
            fill={true}
            text="Dashboard"
          />
        </div>

        <ProfileAvatar />
      </Card>
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