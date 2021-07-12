import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { Card, Input, Button, Badge, Typography } from '@supabase/ui'
import { InputElementCardWrapper } from './index'; 

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
    const [ipFormat, setIpFormat] = useState('ipv4')

    const handleIpUpdate = (event) => setCurrentIp(event.target.value);
    const handleIpFormatChange = (event) => setIpFormat(event.target.value);
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
            labelOptional={
                <span className="relative z-0 inline-flex shadow-md rounded-md">
                    <button
                        value='ipv4'
                        type="button"
                        onClick={handleIpFormatChange}
                        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        IPv4
                    </button>
                    <button
                        value='ipv6'
                        type="button"
                        onClick={handleIpFormatChange}
                        className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${ipFormat==='ipv6'? 'bg-green text-white' : 'bg-white text-black'}`}
                    >
                        IPv6
                    </button>
                </span>
            }
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
            {/* <BlacklistedIpList 
                blacklist={state.blacklist} 
                handleBlacklistDeletion={handleBlacklistDeletion} 
            />  */}
            <InputElementCardWrapper
                title="IP Blacklist"
                description="Enter the IP addresses you'd like blacklisted"
                children={
                    <IpAddressInput 
                        handleBlacklistAddition={handleBlacklistAddition} 
                    />
                }
            />
        </>
    );
  }
  
   export default BlacklistInput
   
  