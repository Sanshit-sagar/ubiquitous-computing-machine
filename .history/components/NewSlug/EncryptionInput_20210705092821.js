import React, { useState } from 'react'

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'

import { Input } from "@supabase/ui"


const EncryptionInput = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [password, setPassword] = useState('')

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        
        dispatch({
            type: 'update_title',
            payload: {
                value: event.target.value
            }
        }); 
    }

    return (
        <>
            <p> {state.title} </p>

            <InputElementCardWrapper
                title="Password"
                description="Enter a secure password that visitors must enter to gain access"
                children={
                    <Input 
                        label="Password" 
                        value={password}
                        onChange={handlePasswordChange}
                        reveal={true}
                        copy 
                    />
                }
            />
        </>
    );
}

export default EncryptionInput 