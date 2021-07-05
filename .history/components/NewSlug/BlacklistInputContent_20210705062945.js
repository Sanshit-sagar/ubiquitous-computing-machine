import React, {useState} from 'react';

// import { GlobalStore } from '../../store'
import { Input, Button, Badge } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistUpdate }) => {
    

    return (
        <div className="inline-flex justify-start align-start flex-wrap max-w-full">
            {blacklist.map(function(value, index) {
                return (
                    <div key={index}>
                        <Badge color="indigo" className="m-2 px-2 py-1">
                            {value}
                        </Badge> 
                    </div>
                )
            })}
        </div> 
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
        setBlacklist([...blacklist, newlyBlacklistedIp])
    }

    return (
        <>
            <BlacklistedIpList blacklist={blacklist} handleBlacklistUpdate={handleBlacklistUpdate} /> 
            <IpAddressInput handleBlacklistUpdate={handleBlacklistUpdate} />
        </>
    );
  }
  
   export default BlaclistInputContent
   
  