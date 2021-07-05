import React from 'react';

// import { GlobalStore } from '../../store'
import { Card, Typography } from '@supabase/ui'

const BlacklistedIpList = () => {
    let blacklist = ['a', 'b', 'c'];

    return (
        <p> {JSON.stringify(blacklist)} </p>
    )
}

const IpAddressInput = () => {


    return (
        <h1> ip address input </h1>
    )
}



const TagManager = () => {
    return (
        <Card 
          className="w-full flex-col justify-start align-stretch"
          title={
            
            <div className="inline-flex justify-start align-stretch">
              <Typography level={3}> 
                IP blacklists
              </Typography>
              <Typography level={5} variant="secondary">
                Enter the IP addresses that should be blacklisted
              </Typography>
            </div>
          }
        >
            <BlacklistedIpList /> 
            <IpAddressInput />
        </Card>
    );
  }
  
   export default TagManager
   
  