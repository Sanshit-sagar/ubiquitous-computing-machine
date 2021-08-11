import React, { useState, useEffect, useContext } from 'react';
import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'; 
import { dispatchValidationUpdate } from '../../lib/dispatchers'

import { Card } from '../../primitives/Card'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'
import { Label } from '../../primitives/Label'


const DestinationUrl = ({ mutate }) => {
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

    const handleUrlUpdate = (event) => {
        setUrlValue(event.target.value)
    }

    return (
        <Card ghost active={true} css={{ width: '100%', bc: '$loContrast', color: '$hiContrast'}}>
            <InputElementCardWrapper
                title="Custom Slug"
                description={'Select or enter a slug of your liking'}
            >
                <Box> 
                    <Label> Enter a valid destination URL </Label>
                    <TextField size='2' 
                        id="url" 
                        placeholder="https://www.example.com"
                        onChange={(event) => {
                            handleUrlUpdate(event);
                            mutate('destination', event.target.value)
                        }}
                        autocomplete="off"
                    />
                    <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end' }}>
                        <Text css={{ color: isValidUrl ? 'text-green-400' : 'text-red-500' }}> 
                            {isValidUrl ? 'Looks good!' : 'Hmmm, that doesnt look like a valid URL'}
                        </Text> 
                    </Flex>
                </Box>
            </InputElementCardWrapper>
        </Card>
    );
}

export default DestinationUrl