import React, { useContext } from 'react'
import { GlobalStore } from '../../store'

const ExpirationSelectorFactory = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <ExpirationSelector 
            isOptional={true} 
            title="Expiration (TTL)"
            instruction="Select a Date and time after which the new link will expire."
            outputMessage='incorrect input format'
            isSuccessful={false}
            children={datetimeInput}
        />
    );
}


function ExpirationSelector({ isOptional, title, instruction, outputMessage, isSuccessful }) {
    return (
        <div className="w-full flex-col justify-start align-start p-5 m-2 pr-10 border border-black rounded-md bg-white text-gray-700 font-extralight">
            <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-extralight text-gray-600">
                    {title}
                </label>
                <span className="text-sm font-extralight text-gray-600" id="email-optional">
                    {isOptional ? 'optional' : ''}
                </span>
            </div>

            <label> 
                <span className="text-xs mb-5 mt-3"> 
                    {instruction} 
                </span>
            </label>

            <div className="mt-5 mb-2 font-extralight text-gray-600">
                <input 
                    name="expiry" 
                    id="expiry" 
                    value={state.ttl}
                    onChange={(event) => {
                        dispatch({
                            type: 'update_ttl',
                            payload: {
                                value: event.target.value
                            }
                        })
                    }}
                    type="datetime-local"
                    className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="MM/DD/YYYY"
                    aria-describedby="expiry-optional"
                />
            </div>

            <label> 
                <span className="text-xs mt-5" + {isSuccessful ? "text-green-500" : "text-red-500" }> 
                    {outputMessage}
                </span>    
            </label>
        </div>
    )
}

export default ExpirationSelectorFactory 