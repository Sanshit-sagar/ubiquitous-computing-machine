import React from 'react'
import { useSession } from 'next-auth/client'

import DarkMode from '../components/DarkMode/index'
import Loader from '../components/Loader'

import DropdownMenu from '../components/Dropdown'
import SearchBar from '../components/SearchBar'
import { LockClosedIcon } from '@heroicons/react/solid'

const Header = () => {
    const [session, loading] = useSession()
  
  
    return (
        <header className="w-90 mx-5 mb-10 pb-3 pt-2 shadow-md bg-white dark:bg-gray-700 items-center rounded-md">
            <div className="w-full inline-flex justify-between align-center h-full px-3 mx-auto flex-start">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container w-1/2 h-auto">
                        <SearchBar />
                    </div>
                </div>
                
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <DarkMode />
                    { session ? <DropdownMenu /> : <LockClosedIcon className="h-6 w-6 text-yellow-500" /> }
                </div> 

            </div>
        </header>
    )
}

export default Header
