import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'
import { TextField } from '../../primitives/TextField'
import toast from 'react-hot-toast'

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
    const dispatch = useContext(NewSlugStore.Dispatch)
    
    // const handleBlacklistAddition = (toAppend) => {
    //     dispatch({
    //         type: 'append',
    //         payload: {
    //             key: 'blacklist',
    //             value: toAppend
    //         }
    //     }); 
    // }

    // const handleBlacklistDeletion = (index) => {
    //     dispatch({
    //         type: 'filter',
    //         payload: {
    //             key: 'blacklist',
    //             index: index
    //         }
    //     }); 
    // }

    // const handleBlacklistAssign = (values) => {
    //     dispatch({
    //         type: 'assign_array',
    //         payload: {
    //             key: 'blacklist',
    //             value: values,
    //         }
    //     }); 
    // }

    return (
        // todo: where should they be redirected to? default: http cat
          //  mutate={handleBlacklistAssign} />
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="IP Blacklist"
                description="Enter the IP Addresses that shouldn't be allowed to view your webpage" 
                children={
                    <TextField
                        value={value}
                        onChange={handleUpdate}
                        placeholder="SEO Tags"
                    />
                }
            />
        </div>
    );
}
  
export default IpAddressInput
   