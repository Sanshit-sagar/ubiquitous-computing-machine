import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, InputGroup, Icon } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'; 
import { dispatchValidationUpdate } from '../../lib/dispatchers'

// const dispatchValidationUpdate = ({ validationKey, isValidValue, state, dispatch }) => {
//     let unfairlyValidated = isValidValue && (!state.validated[`${validationKey}`] || state.hasError[`${validationKey}`]);
//     let unfairlyErroneous = !isValidValue && (!state.hasError[`${validationKey}`] || state.validated[`${validationKey}`]);

//     if(unfairlyValidated || unfairlyErroneous) {
//         dispatch({
//             type: 'validation',
//             payload: {
//                 key: `${validationKey}`,
//                 isValid: isValidValue,
//             }
//         });
//     }
// }


const DestinationUrl = ({ mutate }) => {
    var urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
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
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                description={'Select or enter a slug of your liking'}
                children={<>
                    <FormGroup
                        helperText="Enter a valid destination URL"
                        label="Destination URL"
                        labelFor="url"
                        labelInfo="(required)"
                    >
                        <InputGroup 
                            id="url" 
                            placeholder="https://www.example.com"
                            onChange={(event) => {
                                handleUrlUpdate(event);
                                mutate('destination', event.target.value)
                            }}
                            leftIcon={<Icon icon="link" intent="primary" />}
                            intent={!isValidUrl ? "danger" : "primary"}    
                            autocomplete="off"
                            rightElement={<Icon icon={isValidUrl ? 'tick-circle' : 'error'} style={{ margin: '5px 5px 0px 0px' }} />}
                        />
                    </FormGroup>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <span className={isValidUrl ? 'text-green-400' : 'text-red-500'}> 
                            {isValidUrl ? 'Looks good!' : 'Hmmm, that doesnt look like a valid URL'}
                        </span> 
                    </div>
                </>}
            />
        </div>
    );
}

export default DestinationUrl