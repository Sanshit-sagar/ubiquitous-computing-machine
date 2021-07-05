import React from 'react';

import { GlobalStore } from '../../store'
import { Card, Typography, Input } from '@supabase/ui'

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
            label="First name"
            value={currentIp}
            onChange={handleIpUpdate}
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
   
  