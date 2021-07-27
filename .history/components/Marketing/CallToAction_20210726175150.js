import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { GlobalStore } from '../../store'

import { Card } from '../../primitives/Card'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'

import { EnterIcon, LockClosedIcon } from '@radix-ui/react-icons'
import Loader from '../../components/Loader'

const Greeting = () => {
  const state = useContext(GlobalStore.State)
  const [session, loading] = useSession()

  if(loading) return <Loader />
  if(!loading && !session) return <p> Error! </p>

  return  ( 
      <span className="text-sm font-extralight mt-3 mr-5">
        {`Hi ${session.user.name}`}
      </span> 
  )
}

const AuthButton = ({ doLogin }) => {

  return (
    <Button onClick={(event) => {
        if(doLogin) {
          router.push('/api/auth/signin');
        } else {
          router.push('/api/auth/signup');
        }
      }
    }>
      <AccessibleIcon label={"Authentication"}>
        {doLogin ? <EnterIcon /> : <LockClosedIcon />}
      </AccessibleIcon>
      <Box css={{ my: '$1' }}>
        <Text> {doLogin ? 'Login' : 'Sign Up'} </Text>
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
                <AuthButton doLogin={false} />
              </Flex>
            : loading ? <Loader /> 
            : 
            <Box>
              <Greeting />
              <AuthButton doLogin={false} />
            </Box>
          }
          </div>
        </div>
      </Card>
    );
  }
  
  export default CallToAction