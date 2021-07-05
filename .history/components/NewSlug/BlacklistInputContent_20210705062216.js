import React, {useState} from 'react';

// import { GlobalStore } from '../../store'
import { Input, Button } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistUpdate }) => {
    

    return (
        <p> {JSON.stringify(blacklist)} </p>
    )
}

const IpAddressInput = ({ handleBlacklistUpdate }) => {
    const [currentIp, setCurrentIp] = useState('')

    const handleIpUpdate = (event) => {
        setCurrentIp(event.target.value)
    }

    const clearIpInput = () => {
        setCurrentIp('')
    }

    return (
        <Input 
            label="IP Address"
            value={currentIp}
            onChange={handleIpUpdate}
            actions={[
                <Button 
                    onClick={() => {
                        handleBlacklistUpdate(currentIp)
                        clearIpInput()
                    }}
                    success
                >
                    Add to Blacklist
                </Button>,
            ]}
        />

    )
}



const BlaclistInputContent = () => {
    const [blacklist, setBlacklist] = useState([])

    const handleBlacklistUpdate = (newlyBlacklistedIp) => {
        setBlacklist([...blacklist, newlyBlacklistedIp
    }

    return (
        <>
            <BlacklistedIpList blacklist={blacklist} handleBlacklistUpdate={handleBlacklistUpdate} /> 
            <IpAddressInput handleBlacklistUpdate={handleBlacklistUpdate} />
        </>
    );
  }
  
   export default BlaclistInputContent
   
  