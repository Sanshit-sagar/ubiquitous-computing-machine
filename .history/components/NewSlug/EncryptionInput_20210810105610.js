import React, { useState, useEffect, useContext } from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Input, Label, Fieldset } from '../../primitives/Label'

const password = atom('');
const isValidPassword = atom((get) => validatePassword(get(password)));

const ValidResult = () => <Text size='1'> Looks good! </Text>
const InvalidResult = () => <Text size='1'> A password needs atleast 8 characters </Text>

const validatePassword = (pw) => {
    return pw.length > 8;
}

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
    const [isValidPassword] = useAtom(isValidPassword);

    return (
        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center'}}>
            {isValidPassword ?  <ValidResult /> : <InvalidResult />}
        </Flex>    
    )
}

const PasswordLabel = () =>  () => <Label htmlFor="destinationUrl"> <Text size='1'> Enter a Secure Password </Text> </Label>;

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