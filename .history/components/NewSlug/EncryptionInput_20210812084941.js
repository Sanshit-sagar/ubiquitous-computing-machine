import React from 'react'

import { atom, useAtom } from 'jotai'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Input, Label, Fieldset } from '../../primitives/Label'

import { InputElementCardWrapper } from './index'; 

const password = atom('');
const isValidPassword = atom((get) => validatePassword(get(password)));

const ValidResult = () => <Text size='1'> Looks good! </Text>
const InvalidResult = () => <Text size='1'> A password needs atleast 8 characters </Text>
const PasswordLabel = () =>  () => <Label htmlFor="password"> <Text size='1'> Enter a Secure Password </Text> </Label>;

const validatePassword = (password) => password.length>=8;

const PasswordInput = () => {
    const [input, setInput] = useAtom(password)

    return (
        <Input 
            id="password" 
            placeholder="password"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}    
            autocomplete="off"
        />
    )
}

const ValidationResult = () => {
    const [isValid] = useAtom(isValidPassword);

    return (
        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', mt: '$2'}}>
            {isValid ?  <ValidResult /> : <InvalidResult />}
        </Flex>    
    )
}

const EncryptionInput = () => {
   
    return (
        <InputElementCardWrapper
            title="Password"
            description="Enter a secure password that visitors must enter to gain access"
        >
            <Fieldset>
                <PasswordLabel />
                <PasswordInput />
                <ValidationResult />
            </Fieldset>
            
        </InputElementCardWrapper>
    );
}

export default EncryptionInput 