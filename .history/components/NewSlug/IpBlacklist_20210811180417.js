import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { TextField } from '../../primitives/TextField'
import toast from 'react-hot-toast'

function isValidIpAddress(ipaddr) {
    if(ipaddr.length < 3) return false;
    return true; 
}

const IpAddressInput = ({ mutate }) => {
    const [currentInput, setCurrentInput] = useState('')
    const [blacklist, setBlacklist] = useState([])

    const handleBlacklistUpdate = (values) => {
        setBlacklist([...values, currentInput]);
        setCurrentInput('');
        mutate(values);
    }

    // const validateRecentAddition = (values) => {
    //     if(values.length) {
    //         let recentlyAddedTag = values[values.length - 1] 
    //         if(isValidIpAddress(recentlyAddedTag)) {
    //             mutate(values);
    //            return true; 
    //         } else {
    //             let validIpsArr = blacklist.splice(0, blacklist.length);
    //             mutate(validIpsArr);
    //             setBlacklist(validIpsArr);
    //             toast.error(`Invalid IP Address: ${values[values.length - 1]}, maintaining list at: ${JSON.stringify(validIpsArr)}`)
    //             return false; 
    //         }
    //     }
    // }

    return (
        <Fieldset>
            <Label> IP Address</Label>
            <TagInput
                values={currentInput}
                onChange={handleBlacklistUpdate}
                placeholder="Enter a valid address to create a blacklist"
            />
        </Fieldset>
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
        // todo: where should they be redirected to? default: http cat
          //  mutate={handleBlacklistAssign} />
    // }

    return (
        <Box 
            css={{  bc: '$loContrast', color: '$hiContrast', 
                    padding: '$2', border: 'thin solid', 
                    borderColor: '$hiContrast' 
            }}
        >
            <InputElementCardWrapper
                title="IP Blacklist"
                description="Enter the IP Addresses that shouldn't be allowed to view your webpage" 
                children={<IpAddressInput />}
            />
        </Box>
    );
}
  
export default IpBlacklist
   