import React from 'react'

function InputWithLeadingItem(props) {
    const { label, leadingElement, placeholder, id, value, onChange } = props;

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
                    name={id}
                    id={id}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default InputWithLeadingItem