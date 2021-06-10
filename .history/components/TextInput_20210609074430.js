import React, {useState} from 'react'
// import {MDComponents, MarkdownIcon} from '@/components/index'
import {ExclamationCircleIcon} from '@heroicons/react/solid'

const ValdationMessage = ({ isInputValid }) => {
    return (
    <> { isInputValid ? 
        <p className="mt-2 text-sm text-red-600" id="email-error">
            Your password must be less than 4 characters. 
        </p>  : null }
    </>
    )
}

function InputWithLeadingItem(props) {
    const { label, leadingElement, placeholder, id, value, onChange } = props;

    const [isValid, setIsValid] = useState(true) 

    return (
        <div>
            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {leadingElement}
                </div>
                
                <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md"
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-invalid={isValid ? "false" : "true"}
                    aria-describedby={isValid ? "email-input" : "email-error"}
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
            </div>
            
            <ValdationMessage isInputValid={isValid} /> 
        </div>
    )
}

export default InputWithLeadingItem