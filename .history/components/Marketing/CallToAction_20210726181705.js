import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { GlobalStore } from '../../store'
import { getInitials } from '../../lib/utils'

import Loader from '../../components/Loader'

import { Card } from '../../primitives/Card'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Avatar, AvatarFallback, AvatarImage } from '../../primitives/Avatar'

import { EnterIcon, LockClosedIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

const ProfileAvatarLarge = ({ name, image, loading }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [prevLoadingStatus, setPrevLoadingStatus] = useState('')
  
  const handleLoadingStatusUpdate = (status) => {
    setIsOnline(name?.length && image?.length && !loading); 
    setPrevLoadingStatus(status)
  }

  return (
    <Avatar>
      <AvatarImage
        src={image}
        alt={name}
        onLoadingStatusChange={(status) => handleLoadingStatusUpdate(status)}
      /> 
      <AvatarFallback delayMs={600}>
        {name?.length && !loading ? getInitials(session.user?.name) : ''}
      </AvatarFallback>
    </Avatar>
  )
}

const Greeting = () => {
  const state = useContext(GlobalStore.State)
  const [session, loading] = useSession()

  if(!loading && !session) return <p> Error! </p>

  return  ( 
    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center' }}>
      <ProfileAvatarLarge 
        name={session.user && !loading ? session.user.name : ''}
        image={session.user && !loading ? session.user.image : ''}
        loading={loading}
      />
      <span className="text-sm font-extralight mt-3 mr-5">
        {`Hi ${session.user.name}`}
      </span> 
    </Flex>
  )
}

const AuthButton = ({ doLogin, doLogout }) => {
  const router = useRouter()

  const handleAuthRouting = () => {
    if(doLogin) {
      router.push('/api/auth/signin');
    } else if(!doLogout) {
      router.push('/api/auth/signup');
    } else {
      router.push('/api/auth/signout');
    }
  }

  return (
    <Button 
      onClick={() => handleAuthRouting({ doLogin, doLogout })}
    > 
      <AccessibleIcon label={"Authentication"}>
        {doLogin ? <EnterIcon /> : <LockClosedIcon />}
      </AccessibleIcon>

      <Box css={{ my: '$1' }}>
        <Text> 
          {
              doLogin ? 'Login' 
            : doLogout ? 'Sign Out'  
            : 'Sign Up'
          } 
        </Text>
      </Box>
    </Button>
  )
}

const CallToAction = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const state = useContext(GlobalStore.State)
  
  return (
      <Card interactive={true} ghost active={true}>
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
            !session ? 
              <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '5px' }}>
                <AuthButton doLogin={true} /> 
                <AuthButton doLogin={false} doLogout={false} />
              </Flex>
            : loading ? <Loader /> 
            : 
            <Box css={{ height: '250px', width: '250px', border: 'thin solid black', borderRadius: '5px' }}>
              <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center'}}>
                <Greeting />
                <AuthButton doLogout={true} />
              </Flex>
            </Box>
          }
          </div>
        </div>
      </Card>
    );
  }
  
  export default CallToAction