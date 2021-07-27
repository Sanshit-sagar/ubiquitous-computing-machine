import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

import StackedLayout from '../../sections/StackedLayout'

import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { TextField } from '../../primitives/TextField'
import StyledTooltip from '../../primitives/Tooltip'
import { Input, Label } from '../../primitives/LabelledInput'
import StyledSeparator from '../../primitives/Separator'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { 
  MagicWandIcon, 
  QuestionMarkCircledIcon, 
  CheckIcon, 
  Cross2Icon 
} from '@radix-ui/react-icons'

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
      css={{ width: '100%', py: '$1', my: '$1' }}
    >
      <Flex css={{ width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
        <AccessibleIcon label={`Auth with ${name}`}> 
          {icon}
        </AccessibleIcon>
        
        <Box css={{ my: '$1', ml: '$2' }}>
          <Text> Continue with {name} </Text>
        </Box>
      </Flex>
    </Button>
  )
}

const CustomDivider = () => {
  return (
    <Box css={{ width: '100%', flexBasis: '1', my: '$3' }}>
      <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center' }}>
        <StyledSeparator />
        <Text css={{ ml: '$1', mr: '$1' }}> OR  </Text>
        <StyledSeparator />
      </Flex>
    </Box>
  )
}

let iconFromName = {
  'github': <Image src='/img/github.svg' alt='GitHub Logo' height={20} width={20} />,
  'google': <Image src='/img/google.svg' alt='Google Logo' height={20} width={20} />,
  'facebook': <Image src='/img/facebook.png' alt='Facebook Logo' height={20} width={20} />,
};

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = ({ providers, csrfToken }) => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValueIsValid, setInputValueIsValid] = useState(validEmailRegex.test(inputValue)); 

    useEffect(() => {
      setInputValueIsValid(validEmailRegex.test(inputValue));
    }, [inputValue]);

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    }

    return (
      <StackedLayout pageMeta={metadata}>
        <Box css={{  width: '325px', padding: '5px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          
          <Text size="$3"> Authentication </Text>

          <Box css={{ mb: '$5', mt: '$1' }}>
            <StyledSeparator />
          </Box>

          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <VisuallyHidden.Root>
              <Input 
                name="csrfToken" 
                type="hidden" 
                defaultValue={csrfToken} 
              />
            </VisuallyHidden.Root>
              
              
            <Box css={{ width: '100%', px: '$1', mb: '$3' }}>

              <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center'}}>
                <Label css={{ width: '100%', mb: '$1'}}>
                  <Text size='$1'> Email </Text>
                </Label>

                <StyledTooltip 
                  content={
                    <Text> 
                      Enter your email, recieve a magic link, securely sign in
                    </Text>
                  }
                  defaultOpen={false}
                >
                  <button>
                    <AccessibleIcon label='Email Authentication'>
                      <QuestionMarkCircledIcon /> 
                    </AccessibleIcon>
                  </button>
                </StyledTooltip>

              </Flex>
                
              <Box css={{ mt: '$1', mb: '$2' }}>
                <TextField
                  variant="ghost"
                  ref={inputRef}
                  state={inputValueIsValid ? 'valid' : 'invalid'}
                  value={
                    <Flex css={{ width:'100%', jc: 'space-between', ai: 'center' }}>
                      <Text>{inputValue}</Text> 
                      {inputValueIsValid ? <CheckIcon /> : <Cross2Icon />}
                    </Flex>
                  }
                  onChange={handleInputChange}
                />
              </Box>

              <Button css={{ width: '100%', py: '$1', mt: '$2' }}>
                <Flex css={{ width: '100%', fd: 'row', jc: 'center', ai: 'center'}}>
                  <AccessibleIcon label="Magic Link">
                    <MagicWandIcon />
                  </AccessibleIcon>

                  <Box css={{ my: '$1', ml: '$2' }}>
                    <Text> Continue with Email </Text> 
                  </Box>
                </Flex>
              </Button>

            </Box>  
          </Flex>

          <CustomDivider />

          <Box css={{ width: '100%', px: '$1', mb: '$3' }}>
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