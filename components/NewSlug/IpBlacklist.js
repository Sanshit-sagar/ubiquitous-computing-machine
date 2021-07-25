import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'
import { TagInput, Icon } from '@blueprintjs/core'
import toast from 'react-hot-toast'

// const BlacklistedIpList = ({ blacklist, handleBlacklistDeletion }) => {

//     return (
//         <div 
//             className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
//         >
//             <Card>
//                 {!blacklist.length 
//                     ?   
//                         <Typography.Text> 
//                             Add IP addresses below to start seeing your blacklist here 
//                         </Typography.Text> 
//                     :  
//                         <> 
//                             <Typography.Title level={4}> 
//                                 Blacklisted IP Addresses 
//                             </Typography.Title> 
//                             <br /> 
//                         </>
//                 }
//                 <li className="inline-flex justify-start align-start flex-wrap max-w-full">
//                     {blacklist.map(function(value, index) {
//                         return (
//                             <ul key={index}>
//                                 <Badge 
//                                     color="pink" 
//                                 >
//                                     {value}
//                                     <Button 
//                                         onClick={() => {
//                                             handleBlacklistDeletion(index)
//                                         }}
//                                         style={{ padding: '1px 2px 1px 2px', margin: '3px 2px 2px 5px', backgroundColor: 'green', color: 'white' }}
//                                     > 
//                                         x
//                                     </Button>
//                                 </Badge> 
//                             </ul>
//                         )
//                     })}
//                 </li> 
//             </Card>
//         </div>
//     )
// }
const IpBlacklistDisplay = ({ blacklist, handleBlacklistDeletion }) => {

    const handleBlacklistChange = () => {
        toast.success('updating...'); 
    }

    const handleAdd = () => {
        toast.success('adding to blackist...');
    }


    return (
        <div className="w-full flex-col justify-start align-stretch">
            <TagInput 
                values={blacklist}
                placeholder="Enter a valid address to create a blacklist"
                onChange={handleBlacklistChange}
                leftIcon="ip-address"
                rightElement={
                    <Icon 
                        icon="warning-sign" 
                        intent="danger" 
                    />
                }
                onRemove={handleBlacklistDeletion}
                onAdd={handleAdd}
                addOnBlur={true}
                addOnPaste={true} 
            />
        </div>
    )
}

function isValidIpAddress(ipaddr) {
    if(ipaddr.length < 3) return false;
    return true; 
}

const IpAddressInput = ({ mutate }) => {
    const [blacklist, setBlacklist] = useState([])

    const handleBlacklistUpdate = (values) => {
        setBlacklist(values);
        mutate(values);
    }

    const validateRecentAddition = (values) => {
        if(values.length) {
            let recentlyAddedTag = values[values.length - 1] 
            if(isValidIpAddress(recentlyAddedTag)) {
                mutate(values);
               return true; 
            } else {
                let validIpsArr = blacklist.splice(0, blacklist.length);
                mutate(validIpsArr);
                setBlacklist(validIpsArr);
                toast.error(`Invalid IP Address: ${values[values.length - 1]}, maintaining list at: ${JSON.stringify(validIpsArr)}`)
                return false; 
            }
        }
    }

    return (
        <TagInput 
            label="IP Address"
            values={blacklist}
            onChange={handleBlacklistUpdate}
            leftIcon="tag"
            rightElement={<Icon icon="warning-sign" />}
            placeholder="Enter a valid address to create a blacklist"
            large={false}
            intent="primary"
            addOnPaste={true}
            addOnBlur={true}
            onAdd={validateRecentAddition}
        />
    )
}



const IpBlacklist = () => {
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

    const handleBlacklistAssign = (values) => {
        dispatch({
            type: 'assign_array',
            payload: {
                key: 'blacklist',
                value: values,
            }
        }); 
    }

    return (
        // todo: where should they be redirected to? default: http cat
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="IP Blacklist"
                description="Enter the IP Addresses that shouldn't be allowed to view your webpage" 
                children={
                    <>
                        <IpAddressInput 
                            mutate={handleBlacklistAssign} 
                        />
                        {/* <IpBlacklistDisplay 
                            blacklist={state.blacklist}
                            handleBlacklistDeletion={handleBlacklistDeletion} 
                        /> */}
                    </>
                }
            />
        </div>
    );
}
  
export default IpBlacklist
   


{/* <BlacklistedIpList 
    blacklist={state.blacklist} 
    handleBlacklistDeletion={handleBlacklistDeletion} 
/>  */}