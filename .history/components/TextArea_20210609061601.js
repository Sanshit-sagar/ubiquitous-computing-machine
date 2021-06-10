
import React from 'react'
import {MarkdownIcon} from './@compnents/index'

const TextAreaForm = (props) => {
    const { label, id, placeholder, value, onChange } = props; 

    return (
        <div className="min-w-0 flex-1">
            <form action="#">
                <div>
                    <label htmlFor="comment" className="sr-only">
                        {label}
                    </label>
                    <textarea
                        id={id}
                        name={id}
                        rows={3}
                        className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder={placeholder}
                        defaultValue={''}
                        value={value}
                        onChange={onChange}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <a  href="#" className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                        <MarkdownIcon 
                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                        <span>
                            Markdown is accepted 
                        </span>
                    </a>
                    <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Commit
                    </button>
                </div>
            </form>
        </div>
    )
}

function TextAreaBlob() {

    return (
        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Content
                    </h2>
                </div>
                
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <TextAreaForm /> 
                </div>
            </div>
        </div>
    );
}

export default TextAreaBlob