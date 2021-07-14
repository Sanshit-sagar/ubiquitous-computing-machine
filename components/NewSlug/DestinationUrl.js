import React, { useState, useContext, useEffect } from 'react';

import { Input } from '@supabase/ui'
import { Icon } from '@blueprintjs/core'

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'; 


const DestinationUrl = ({ mutate }) => {
    var urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
    const state = useContext(NewSlugStore.State)

    const [urlValue, setUrlValue] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(false)

    useEffect(() => {
        setIsValidUrl(urlValidator.test(urlValue));
    }, [urlValue, urlValidator]);

    const handleUrlUpdate = (event) => {
        setUrlValue(event.target.value)
    }

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                description={'Select or enter a slug of your liking'}
                children={
                    <Input 
                        label="Destination URL"
                        type="url"
                        value={state.destination}
                        onChange={(event) => {
                            handleUrlUpdate(event);
                            mutate('destination', event.target.value)
                        }}
                        error={!isValidUrl ? "invalid url" : ""}
                        icon={
                            <Icon icon="link" />
                        }
                        descriptionText="Enter a valid destination URL" 
                        labelOptional="HTTP/HTTPS only"
                        className="mt-6"
                    />
                }
            />
        </div>
    );
}

export default DestinationUrl