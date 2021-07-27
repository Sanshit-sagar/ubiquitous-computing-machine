import React, { useState } from 'react'
import StackedLayout from '../../sections/StackedLayout'
import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Input, Label } from '../../primitives/LabelledInput'

import { FaceIcon } from '@radix-ui/react-icons'

import { getProviders, signIn, signOut } from 'next-auth/client'

const metadata = { 
  title:'Authentication', 
  description: 'do it via Google, GitHub, Facebook, Email Link'
}

const AuthProviderButton = ({ id, name }) => {
  return (
    <Button 
      color="gray" 
      outlined 
      onClick={() => signIn(id)}
      css={{ padding: '2px' }}
    >
      <AccessibleIcon label={`Auth with ${name}`}> 
        <FaceIcon />
      </AccessibleIcon>
      
      <Box css={{ my: '$1' }}>
        <Text> Sign in with {name} </Text>
      </Box>
    </Button>
  )
}

export default function SignIn({ providers }) {
    const [email, setEmail] = useState('')

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    return (
      <StackedLayout pageMeta={metadata}>
        <Box css={{  width: '250px', height: '200px', padding: '2px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          
          <Flex css={{ p: '5px', fd: 'column', jc: 'flex-start', fw: 'wrap', ai: 'flex-start' }}>
            <Label htmlFor="email" css={{ lineHeight: '35px', marginRight: 15 }}>
              Email
            </Label>
            <Input 
              type="email" 
              id="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="example@email.com" 
            />
          </Flex>

          <Flex css={{ fd: 'column', jc: 'space-evenly', ai: 'stretch'}}>
            {Object.values(providers).map((provider) => {
              if (provider.name === "Email") {
                return;
              }

              return (
                <Box key={provider.name}>
                  <AuthProviderButton  
                    id={provider.id} 
                    name={provider.name} 
                  />
                </Box>
              );
            })} 
          </Flex>
        </Box>
      </StackedLayout>
    ); 
}

export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}