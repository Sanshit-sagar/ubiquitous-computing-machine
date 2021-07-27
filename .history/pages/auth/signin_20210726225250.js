import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

import StackedLayout from '../../sections/StackedLayout'
import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { TextField } from '../../primitives/TextField'
import StyledSeparator from '../../primitives/Separator'

import { Input, Label } from '../../primitives/LabelledInput'
import { MagicWandIcon } from '@radix-ui/react-icons'

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
      css={{ width: '100%', padding: '2px', marginTop: '5px', marginBottom: '5px' }}
    >
      <Flex css={{ width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
        <AccessibleIcon label={`Auth with ${name}`}> 
          {icon}
        </AccessibleIcon>
        
        <Box css={{ my: '$1', ml: '$2' }}>
          <Text> Sign in with {name} </Text>
        </Box>
      </Flex>
    </Button>
  )
}

let iconFromName = {
  'github': <Image src='/img/github.svg' alt='GitHub Logo' height={20} width={20} />,
  'google': <Image src='/img/google.svg' alt='Google Logo' height={20} width={20} />,
  'facebook': <Image src='/img/google.svg' alt='Google Logo' height={20} width={20} />,
};

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = ({ providers, csrfToken }) => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValueIsValid, setInputValueIsValid] = useState(true)

    useEffect(() => {
      const validityCheckResult = validEmailRegex.test(inputValue);
      setInputValueIsValid(validityCheckResult);
    }, [inputValue, inputValueIsValid, validEmailRegex]);

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    }

    return (
      <StackedLayout pageMeta={metadata}>
        <Box css={{  width: '250px', height: '200px', padding: '7.5px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <VisuallyHidden.Root>
              <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            </VisuallyHidden.Root>
              
              <Label>Email</Label>
              <Box css={{ px: '$2', mb: '$3' }}>
                <TextField
                  variant="ghost"
                  ref={inputRef}
                  state={inputValueIsValid ? undefined : 'invalid'}
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Box>
            

            <Button css={{ width: '100%' }}>
              <Flex css={{ width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
                <AccessibleIcon label="Magic Link">
                  <MagicWandIcon />
                </AccessibleIcon>

                <Box css={{ my: '$1' }}>
                  <Text> Email me the magic link </Text> 
                </Box>
              </Flex>
            </Button>
          </Flex>

        <Box css={{ marginTop: '10px', marginBottom: '10px' }}>
          <StyledSeparator />
        </Box>

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