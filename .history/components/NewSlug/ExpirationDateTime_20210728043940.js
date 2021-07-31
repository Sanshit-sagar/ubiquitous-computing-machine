import React, { useContext, useEffect, useState } from 'react'
import { NewSlugStore } from '../../store'
import { CalendarIcon } from '@radix-ui/react-icons'
import { InputElementCardWrapper } from './index'
import { timeDifference } from '../../lib/datetime'
import toast from 'react-hot-toast'
import { dispatchValidationUpdate } from '../../lib/dispatchers'

const ExpirationDateTime = ({ mutate }) => {
    const [isValidDate, setIsValidDate] = useState(false)

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    useEffect(() => {
        let validationKey = 'ttl';
        let isValidValue = false;
        
        if(state.ttl?.length && parseInt(state.ttl)) {
            let proposedExpiration = new Date(state.ttl).getTime()
            let currentDatetime = new Date().getTime()
            isValidValue = proposedExpiration > currentDatetime;
        } 

        setIsValidDate(isValidValue);
        dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch });
    }, [state.ttl])
    

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title='Expiration [Time To Live]'
                description='When should this link go offline?'
                children={<>
                    <input 
                        name="ttl" 
                        id="ttl" 
                        value={state.ttl}
                        onChange={(event) => {
                            let userInputDatetime = new Date(event.target.value).getTime()
                            let currentDatetime = new Date().getTime()
                            if(userInputDatetime < currentDatetime) {
                                toast.error('Unable to update, that expiration date has already passed');
                            } else {
                                mutate('ttl', event.target.value)
                            }
                        }}
                        type='datetime-local'
                        className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-white dark:bg-gray-700"
                        placeholder="MM/DD/YYYY"
                        aria-describedby="expiry-optional"
                        icon={<CalendarIcon />}
                    />
                    <span className="inline-flex justify-end align-end w-full">
                        {state.ttl ? timeDifference(new Date(state.ttl).getTime().toString()) : 'n/a'}
                    </span>
                </>}
            />
        </div>
    );
}

export default ExpirationDateTime