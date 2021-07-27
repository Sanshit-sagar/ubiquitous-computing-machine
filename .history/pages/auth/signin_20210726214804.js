import React, { useState } from 'react'
import Image from 'next/image'

import StackedLayout from '../../sections/StackedLayout'
import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Fieldset, Input, Label } from '../../primitives/LabelledInput'
import { FaceIcon, MagicWandIcon } from '@radix-ui/react-icons'

import { getProviders, getCsrfToken, signIn, signOut } from 'next-auth/client'

const metadata = { 
  title:'Authentication', 
  description: 'do it via Google, GitHub, Facebook, Email Link'
}

const AuthProviderButton = ({ id, name, icon }) => {
  return (
    <Button 
      color="gray" 
      outlined 
      onClick={() => signIn(id)}
      css={{ padding: '2px', marginTop: '5px', marginBottom: '5px' }}
    >
      <AccessibleIcon label={`Auth with ${name}`}> 
        {icon}
      </AccessibleIcon>
      
      <Box css={{ my: '$1' }}>
        <Text> Sign in with {name} </Text>
      </Box>
    </Button>
  )
}

let iconFromName = {
  'github': <Image src='/img/github.svg' alt='GitHub Logo' height={20} width={20} />,
  'google': <Image src='/img/google.svg' alt='Google Logo' height={20} width={20} />,
  'facebook': <Image src='/img/google.svg' alt='Google Logo' height={20} width={20} />,
};


const SignIn = ({ providers, csrfToken }) => {
    const [email, setEmail] = useState('')

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    return (
      <StackedLayout pageMeta={metadata}>
        <Box css={{  width: '250px', height: '200px', padding: '7.5px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            
            <VisuallyHidden.Root>
              <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            </VisuallyHidden.Root>
              
            <Fieldset>
              <Label>Email</Label>
              <Input 
                type="email" 
                id="email" 
                value={email} 
                onChange={handleEmailChange} 
                placeholder="example@email.com" 
                autocomplete="off"
              />
            </Fieldset>

            <Button css={{ width: '100%' }}>
              <AccessibleIcon label="Magic Link">
                <MagicWandIcon />
              </AccessibleIcon>
              <Box css={{ my: '$1' }}>
                <Text> Email me the magic link </Text> 
              </Box>
            </Button>

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
                    icon={iconFromName[`${provider.name.toLowerCase()}`]}
                  />
                </Box>
              );
            })} 
          </Flex>
        </Box>
      </StackedLayout>
    ); 
}

export default SignIn;

export async function getServerSideProps(context){
  const providers = await getProviders(context);
  const csrfToken = await getCsrfToken(context);

  return {
    props: { 
      providers, 
      csrfToken 
    }
  }; 
}