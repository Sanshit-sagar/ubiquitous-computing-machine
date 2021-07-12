import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { Card, Input, Button, Badge, Typography } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistDeletion }) => {

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
                {!blacklist.length 
                    ?   
                        <Typography.Text> 
                            Add IP addresses below to start seeing your blacklist here 
                        </Typography.Text> 
                    :  
                        <> 
                            <Typography.Title level={4}> 
                                Blacklisted IP Addresses 
                            </Typography.Title> 
                            <br /> 
                        </>
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

    const handleIpUpdate = (event) => setCurrentIp(event.target.value);
    const clearIpInput = () => setCurrentIp('');

    return (
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
                        clearIpInput()
                    }}
                    success
                >
                    Add to Blacklist
                </Button>,
            ]}
            className="mt-6"
        />
    )
}



const BlacklistInput = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    
    const handleBlacklistAddition = (toAppend) => {
        dispatch({
            type: 'append',
            payload: {
                key: 'blacklist',
                value: toAppend
            }
        }); 
    }

    const handleBlacklistDeletion = (index) => {
        dispatch({
            type: 'filter',
            payload: {
                key: 'blacklist',
                index: index
            }
        }); 
    }

    return (
        <>
            <BlacklistedIpList 
                blacklist={state.blacklist} 
                handleBlacklistDeletion={handleBlacklistDeletion} 
            /> 
            <IpAddressInput 
                handleBlacklistAddition={handleBlacklistAddition} 
            />
        </>
    );
  }
  
   export default BlacklistInput
   
  