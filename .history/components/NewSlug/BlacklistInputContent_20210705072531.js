import React, {useState} from 'react';

// import { GlobalStore } from '../../store'
import { Card, Input, Button, Badge } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistDeletion }) => {
    

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
            <li className="inline-flex justify-start align-start flex-wrap max-w-full">
                {blacklist.map(function(value, index) {
                    return (
                        <ul key={index}>
                            <Badge 
                                color="pink" 
                                style={{ marginRight: '5px' }}
                            >
                                {value}
                                <Button 
                                    onClick={() => {
                                        handleBlacklistDeletion(index)
                                    }}
                                    style={{ padding: '1px 2px 1px 2px', margin: '3px 2px 2px 5px', backgroundColor: 'green', color: 'white' }}
                                > 
                                    x
                                </Button>
                            </Badge> 
                        </ul>
                    )
                })}
            </li> 
            </Card>
        </div>
    )
}

const IpAddressInput = ({ handleBlacklistAddition }) => {
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
                        handleBlacklistAddition(currentIp)
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

    const handleBlacklistAddition = (newlyBlacklistedIp) => {
        setBlacklist([...blacklist, newlyBlacklistedIp]);
    }

    const handleBlacklistDeletion = (index) => {
        setBlacklist(blacklist.filter(function(e, i) {
            return i!==index; 
        })); 
    }

    return (
        <>
            <BlacklistedIpList 
                blacklist={blacklist} 
                handleBlacklistDeletion={handleBlacklistDeletion} 
            /> 
            <IpAddressInput 
                handleBlacklistAddition={handleBlacklistAddition} 
            />
        </>
    );
  }
  
   export default BlaclistInputContent
   
  