import React from 'react';
import { InputElementCardWrapper } from './index'; 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Input, Label, Fieldset } from '../../primitives/Label'

import { atom, useAtom } from 'jotai'

const urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
  
const destinationUrlAtom = atom('');
const isValidAtom = atom((get) => urlValidator.test(get(destinationUrlAtom)));
const ogMetadata = atom({})

const ValidResult = () => <Text size='1'> Looks good! </Text>;
const InvalidResult = () => <Text size='1'> 'Hmmm, that doesnt look like a valid URL </Text>;
const DestinationUrlLabel = () => <Label htmlFor="destinationUrl"> <Text size='1'> Destination URL </Text> </Label>;

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
        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end', mt: '$2' }}>
            <Text size='1' css={{ color: '$hiContrast' }}> 
                {isValidUrl ? <ValidResult />  :  <InvalidResult />}
            </Text> 
        </Flex>
    )
}

const OgOutput = () => {
    const [isValidUrl] = useAtom(isValidAtom)

    const { data, error } = useSWR(isValidUrl && !metadata ? `/api/links/openGraph?destination=${destination}` : null); 
   
    return <Text> {JSON.stringify(data)} </Text>
}


const DestinationUrl = () => {
    const [destination, setInput] = useAtom(destinationUrlAtom)

    return (
            <InputElementCardWrapper
                title="Destination URL"
                description='Enter the URL of the website youd like to generate a slug for'
            > 
                <Fieldset> 
                    <DestinationUrlLabel />
                    <DestinationUrlInput />
                    <ValidationResult />
                    <OgOutput />
                </Fieldset>
            </InputElementCardWrapper>
    );
}

export default DestinationUrl