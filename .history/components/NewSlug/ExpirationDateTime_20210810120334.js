import React, { useEffect } from 'react'
import { timeDifference } from '../../lib/datetime'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Label, Fieldset, Input } from '../../primitives/Label'
import { InputElementCardWrapper } from './index'

import { atom, useAtom } from 'jotai'

const HOUR_IN_MILIS = 3600000;

const expirationAtom = atom('')
const timeDiffAtom = atom('')
const isValidExpiration = atom((get) => (isValidDate(getDate(get(expirationAtom))) && isMinimumOneHourAway(getDate(get(expirationAtom)))))

const getDate = (timestamp) => new Date(parseInt(timestamp))
const isValidDate = (date) => Object.prototype.toString.call(get(expirationAtom))==='[object Date]' && isFinite(get(expirationAtom))
const isMinimumOneHourAway = (timestamp) => getMinsFromNow(parseInt(timestamp))>=HOUR_IN_MILIS;
const getMinsFromNow = (timestamp) => getCurrentTimestamp() - parseInt(timestamp);
const getCurrentTimestamp = () => new Date().getTime();

const NoValidInputStr = () => <Text size='1'> N/A </Text>
const TimeDiffStr = ({ timeDiff }) => <Text size='1'> {timeDiff} from now </Text>
const ExpiryLabel = () => {
    return (
        <Label htmlFor="expiration"> 
            <Text size='1'> When should this slug expire? (optional) </Text> 
        </Label>
    );
}

const TimeFromNow = () => {    
    const [isValid] = useAtom(isValidExpiration)
    const [timeDiff, setTimeDiff] = useAtom(timeDiffAtom)

    return (
       <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center'}}>
           {isValid ? <TimeDiffStr timeDiff={timeDiff} /> : <NoValidInputStr /> }
       </Flex>
    )
}

const ExpirationInput = () => {
    const [isValid] = useAtom(isValidExpiration)
    const [expiry, setExpiry] = useAtom(expirationAtom)
    const [timeDiff, setTimeDiff] = useAtom(timeDiffAtom)

    useEffect(() => {
        if(isValid) {
            setTimeDiff(timeDifference(expiry))
        }
    }, [expiry, timeDiff, isValid]);

    // const updateInputDate = (e) => setExpiry(new Date(e.target.value).getTime())

    return (
        <> 
        <Text> --{expiry}-- </Text>
        <input 
            name="ttl" 
            id="ttl" 
            value={expiry} 
            onChange={(e) => setExpiry(e.target.value)}
            type='datetime-local'
            className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-white dark:bg-gray-700"
            placeholder="MM/DD/YYYY"
            aria-describedby="expiry-optional"
        />
        </>
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