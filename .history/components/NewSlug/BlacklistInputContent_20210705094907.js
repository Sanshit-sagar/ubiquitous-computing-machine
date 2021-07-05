import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { Card, Input, Button, Badge, Typography } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistDeletion }) => {
    const { Title, Text } = Typography; 

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
                {!blacklist.length 
                    ?   <Text> Add IP addresses below to start seeing your blacklist here </Text> 
                    :  <> <Title level={4}> Blacklisted IP Addresses </Title> <br /> </>
                }
                <li className="inline-flex justify-start align-start flex-wrap max-w-full">
                    {blacklist.map(function(value, index) {
                        return (
                            <ul key={index}>
                                <Badge 
                                    color="pink" 
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
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleIpUpdate = (event) => setCurrentIp(event.target.value);
    const clearIpInput = () => setCurrentIp('');

    const appendToBlacklist = (toAppend) => {
        dispatch({
            type: 'append',
            payload: {
                key: 'blacklist',
                value: toAppend
            }
        }); 
    }

    return (
        <>
            <p> {JSON.stringify(state.blacklist)} </p>
            <Input 
                label="IP Address"
                value={currentIp}
                onChange={(event) => {
                    handleIpUpdate(event) 
                }}
                actions={[
                    <Button 
                        onClick={() => {
                            handleBlacklistAddition(currentIp)
                            appendToBlacklist(currentIp) 
                            clearIpInput()
                        }}
                        success
                    >
                        Add to Blacklist
                    </Button>,
                ]}
            />
        </>

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
   
  