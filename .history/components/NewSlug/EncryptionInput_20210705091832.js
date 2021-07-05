import React, { useState } from 'react'

import {InputElementCardWrapper} from './index'

import { Input } from "@supabase/ui"


const EncryptionInput = () => {
    const [password, setPassword] = useState('')

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
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
    );
}

export default EncryptionInput 