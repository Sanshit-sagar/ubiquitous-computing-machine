import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import ProfileAvatar from '../../primitives/Avatar'
import { GlobalStore } from '../../store'

import { Card, Button, Icon, Elevation } from '@blueprintjs/core'

const Greeting = () => {
  const state = useContext(GlobalStore.State)
  const router = useRouter()
  const [session, loading] = useSession()

  if(session && session?.user) {
    return  ( 
      <Card 
        className={!state.darkMode ? 'bp3-dark' : ''}
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '0px 15px 0px 2px' }}
      >
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom: '5px' }}>
          <span className="text-sm font-extralight mt-3 mr-5">
            {loading ? '' : `Hi, ${session.user.name}` }  
          </span>

          <ProfileAvatar 
            name={session.user.name}
            image={session.user.image}
            loading={loading}
          />
        </div>
        <Button 
          loading={loading} 
          disabled={loading} 
          onClick={() => {
            router.push('/dashboard')
          }}
          rightIcon={
            <Icon icon="dashboard"  />
          }
          fill={true}
          text="Dashboard"
          style={{ marginTop: '5px 0px 0px 0px' }}
        />
      </Card>
    )
  } 
}

const CallToAction = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const state = useContext(GlobalStore.State)
  
  return (
      <Card 
        className={!state.darkMode ? 'bp3-dark' : ''}
        interactive={true} 
        elevation={Elevation.TWO}
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            <span className="block">
              Web analytics delivered from the edge
            </span>
            <span className="block text-green-400">
              cute.ly, secure.ly, analytic.ly, 
            </span>
          </h2>

          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              {
                session && session.user ? 
                <Greeting /> : 
                <Button
                  size="large"
                  type="outline"
                  iconRight={<Icon icon="login" />}
                  loading={loading}
                  disabled={loading}
                  onClick={() => {
                    router.push('/api/auth/signin')
                  }}
                  text="Login"
                /> 
              }
          </div>
        </div>
      </Card>
    );
  }
  
  export default CallToAction