import React, { useContext, useEffect, useState } from 'react'
import { NewSlugStore } from '../../store'
import { CalendarIcon } from '@radix-ui/react-icons'
import { InputElementCardWrapper } from './index'
import { timeDifference } from '../../lib/datetime'
import toast from 'react-hot-toast'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

const expirationAtom = atom('')
const timeDiffAtom = atom('---')
const isValidExpiration = atom((get) => isValidDate(getDate(expiry)) && isMinimumOneHourAway(getDate(expiry)))

const getDate = (timestamp) => new Date(parseInt(timestamp))

const isMinimumOneHourAway = (timestamp) => getMinsFromNow(parseInt(timestamp))>=3600000;
const getMinsFromNow = (timestamp) => getCurrentTimestamp() - parseInt(timestamp);
const getCurrentTimestamp = () => new Date().getTime();

const TimeFromNow = () => {
    const [isValid] = useAtom(isValidExpiration)
    const [expiry, setExpiry] = useAtom(expirationAtom)
    const [timeDiff, setTimeDiff] = useAtom(timeDiffAtom)

    useEffect(() => {
        if(isValid) {
            setTimeDiff(timeDifference(expiry))
        }
    }, [expiry, timeDiff, isValid]);

    return (
        <Box css={{ margin: '$2' }}>
            <Text> {state.ttl ? timeDifference() : 'n/a'} </Text>
        </Box>
    )
}

const ExpirationInput = () => {
    const [expiry, setExpiry] = useAtom(expirationAtom)

    return (
        <input 
            name="ttl" 
            id="ttl" 
            value={expiry} 
            onChange={(e) => setExpiry(parseInt(new Date(e.target.value).getTime().toString()))}
            type='datetime-local'
            className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-white dark:bg-gray-700"
            placeholder="MM/DD/YYYY"
            aria-describedby="expiry-optional"
        />
    )
}

const ExpirationDateTime = () => {

    return (
        <InputElementCardWrapper
            title='Expiration [Time To Live]'
            description='When should this link go offline?'
        >
            <Fieldset>
                <ExpiryLabel />
                <ExpirationInput />
                <TimeFromNow />
            </Fieldset>
        </InputElementCardWrapper>
    );
}

export default ExpirationDateTime