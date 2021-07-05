import React from 'react';

import { GlobalStore } from '../../store'
import { Card, Typography } from '@supabase/ui'
import { Input } from "@supabase/ui";

const BlacklistedIpList = () => {
    let blacklist = ['a', 'b', 'c'];

    return (
        <p> {JSON.stringify(blacklist)} </p>
    )
}

const IpAddressInput = () => {


    return (
        
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
   
  