
import React, { useState } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import {useSession} from 'next-auth/client'

const UsernameAndHandle = ({ username, userHandle, userNavLink }) => {
    
    return (
        <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                {username}
            </h3>
            <p className="text-sm text-gray-500">
                <a href={`/${userNavLink}`}>
                    @{userHandle}
                </a>
            </p>
        </div>
    )
}

const Header = (props) => {
    const [session, loading] = useSession()

    // const [username, setUsername] = useState('')
    // const [userHandle, setUserHandle] = useState('')
    // const [userNavLink, setUserNavLink] = useState('') 

    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-12 w-12 rounded-full"
                                // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                src={session.image}
                                alt="profilePicture"
                            />
                        </div>
                        <UsernameAndHandle username={session.name} userHandle={session.email} userNavLink={session.image} /> 
                    </div>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0 flex">
                    <button
                        type="button"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span> 
                            www.abcdthisisaadge... 
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header