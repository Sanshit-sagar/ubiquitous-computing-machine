import React, { useState, useEffect, useContext } from 'react'
import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'
import { FormGroup, InputGroup, Icon } from "@blueprintjs/core"

import { dispatchValidationUpdate } from '../../lib/dispatchers'

function validatePassword(pw) {
    if(pw.length > 8) {
        return true;
    } else {
        return false;
    } 
}

const EncryptionInput = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    const [isValidPassword, setIsValidPassword] = useState(false)

    useEffect(() => {
        let validationKey = 'security'
        let isValidValue = validatePassword(state.password)

        setIsValidPassword(isValidValue);
        dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch })
    }, [state.password, validatePassword]);


    const handlePasswordChange = (event) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'password',
                value: event.target.value
            }
        }); 
    }

    return (
        <>
            <InputElementCardWrapper
                title="Password"
                description="Enter a secure password that visitors must enter to gain access"
                children={
                    <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                        <FormGroup
                            helperText="Enter a password that users need to enter to view your site"
                            label="Encryption Key" 
                            labelFor="encryptionKey"
                            labelInfo="(optional)"
                        >
                            <InputGroup 
                                id="password" 
                                placeholder="abcdefgh"
                                type="password"
                                value={state.password}
                                onChange={handlePasswordChange}
                                leftIcon={<Icon icon="lock" intent="primary" />}
                                intent={!isValidPassword ? "danger" : "primary"}    
                                autocomplete="off"
                                rightElement={<Icon icon={isValidPassword ? 'tick-circle' : 'error'} style={{ margin: '5px 5px 0px 0px' }} />}
                            />
                        </FormGroup>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <span className={isValidPassword ? 'text-green-400' : 'text-red-500'}> 
                                {isValidPassword ? 'Looks good!' : 'A password needs atleast 8 characters'}
                            </span> 
                        </div>
                    </div>
                }
            />
        </>
    );
}

export default EncryptionInput 