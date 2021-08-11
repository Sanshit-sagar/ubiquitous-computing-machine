import React from 'react';
import { InputElementCardWrapper } from './index'; 
import { dispatchValidationUpdate } from '../../lib/dispatchers'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Input, Label, Fieldset } from '../../primitives/Label'

import { atom, useAtom } from 'jotai'

const urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
  

const destinationUrlAtom = useAtom('');
const isValidAtom = atom((get) => urlValidator.test(get(destinationUrlAtom)));

const DestinationUrlInput = () => {
    const [input, setInput] = useAtom(destinationUrlAtom)
    return (
        <Input
            id="url" 
            type="url"
            placeholder="https://www.example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autocomplete="off"
        />
    )
}

const ValidationResult = () => {
    const [isValidUrl] = useAtom(isValidAtom);
    
    return (
        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end' }}>
            <Text css={{ color: '$hiContrast' }}> 
                {isValidUrl ? 'Looks good!'  : 'Hmmm, that doesnt look like a valid URL'} 
            </Text> 
        </Flex>
    )
}


const DestinationUrl = () => {
    const [text, setText] = useAtom(textAtom)

    
    return (
            <InputElementCardWrapper
                title="Destination URL"
                description='Enter the URL of the website youd like to generate a slug for'
            > 
                <Fieldset> 
                    <Label htmlFor="destinationUrl"> 
                        <Text size='1'> Destination URL </Text>
                    </Label>
                    <DestinationUrlInput />
                    <ValidationResult />
                </Fieldset>
            </InputElementCardWrapper>
    );
}

export default DestinationUrl