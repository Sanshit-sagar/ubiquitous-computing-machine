import React, { useState, useEffect, useContext } from 'react';
import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'; 
import { dispatchValidationUpdate } from '../../lib/dispatchers'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'


import { Label, Fieldset } from '../../primitives/Label'

const DestinationUrl = () => {
    const urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [urlValue, setUrlValue] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(false)

    useEffect(() => {
        let validationKey = 'url'
        let isValidValue = urlValidator.test(urlValue)
        setIsValidUrl(isValidValue);

        dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch });
    }, [urlValue, urlValidator]);

    // const handleUrlUpdate = (event) => {
    //     setUrlValue(event.target.value)
    // }

    return (
            <InputElementCardWrapper
                title="Destination URL"
                description='Enter the URL of the website youd like to generate a slug for'
            > 
                <Fieldset> 
                    <Label htmlFor="destinationUrl"> 
                        <Text size='1'> Destination URL </Text>
                    </Label>
                    <TextField size='1'
                        id="url" 
                        type="url"
                        placeholder="https://www.example.com"
                        onChange={(event) => {setValue(event.target.value)}}
                        autocomplete="off"
                        css={{ bc: '$slate9', color: '$hiContrast'}}
                    />
                    <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end' }}>
                        <Text css={{ color: isValidUrl ? 'text-green-400' : 'text-red-500' }}> 
                            {isValidUrl ? 'Looks good!' : 'Hmmm, that doesnt look like a valid URL'}
                        </Text> 
                    </Flex>
                </Fieldset>
            </InputElementCardWrapper>
    );
}

export default DestinationUrl