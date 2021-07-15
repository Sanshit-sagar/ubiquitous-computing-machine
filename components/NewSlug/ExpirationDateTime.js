import React, { useContext } from 'react'
import { NewSlugStore } from '../../store'
import { IconCalendar } from '@supabase/ui'
import { InputElementCardWrapper } from './index'

const ExpirationDateTime = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title='Expiration [Time To Live]'
                description='When should this link go offline?'
                children={
                
                    <input 
                        name="ttl" 
                        id="ttl" 
                        value={state.ttl}
                        onChange={(event) => {
                            mutate('ttl', event.target.value)
                        }}
                        type='datetime-local'
                        className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-white dark:bg-gray-700"
                        placeholder="MM/DD/YYYY"
                        aria-describedby="expiry-optional"
                        icon={<IconCalendar className="h-5 w-5" />}
                    />
                }
            />
        </div>
    );
}

export default ExpirationDateTime