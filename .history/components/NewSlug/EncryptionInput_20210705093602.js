import React, { useContext } from 'react'

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'

import { Input } from "@supabase/ui"

const EncryptionInput = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handlePasswordChange = (event) => {
        dispatch({
            type: 'assignment',
            payload: {
                key: 'yaya',
                value: event.target.value
            }
        }); 
    }

    return (
        <>
            <p> {state.password} </p>

            <InputElementCardWrapper
                title="Password"
                description="Enter a secure password that visitors must enter to gain access"
                children={
                    <Input 
                        label="Password" 
                        value={state.password}
                        onChange={handlePasswordChange}
                    />
                }
            />
        </>
    );
}

export default EncryptionInput 