import React, {useState} from 'react';

import { GlobalStore } from '../../store'
import { Card, Typography, Input, Button } from '@supabase/ui'

const BlacklistedIpList = () => {
    let blacklist = ['a', 'b', 'c'];

    return (
        <p> {JSON.stringify(blacklist)} </p>
    )
}

const IpAddressInput = () => {
    const [currentIp, setCurrentIp] = useState('')

    const handleIpUpdate = (event) => {
        setCurrentIp(event.target.value)
    }

    return (
        <Input 
            label="IP Address"
            value={currentIp}
            onChange={handleIpUpdate}
            actions={[
                <Button success>Add to Blacklist</Button>,
            ]}
        />

    )
}



const BlaclistInputContent = () => {
    return (
        <>
            <BlacklistedIpList /> 
            <IpAddressInput />
        </>
    );
  }
  
   export default BlaclistInputContent
   
  