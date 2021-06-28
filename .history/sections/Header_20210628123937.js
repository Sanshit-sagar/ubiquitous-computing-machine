import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import DarkModeButton from '../components/DarkModeButton/index'
import Loader from '../components/Loader'
import { 
    InputContainerSvg, 
    SearchIconSvg, 
} from '../buildingBlocks/svgIcons'
import AuthButton from '../components/Auth/AuthButton'


const Header = () => {
    const [session, loading] = useSession()

    const [activeSlug, setActiveSlug] = useState('')
    const [fetchLoading, setFetchLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (activeSlug) {
            setActiveSlug(activeSlug.toLowerCase())
        }
    }, [activeSlug])

    return (
        <header className="w-90 mx-5 shadow-md bg-white dark:bg-gray-600 items-center h-16 rounded-md z-20">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 h-auto">
                        <div className="relative inline-flex items-center w-full lg:w-64 h-full group">
                            <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                <SearchIconSvg />
                            </div>
                            <InputContainerSvg />
                            
                            <input 
                                type="text" 
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="   Search"
                                disabled={fetchLoading}
                                className="inline-flex pl-10 bg-white text-black dark:bg-gray-900 dark:text-white rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-200 ring-opacity-90aa-input" 
                            />
                            <span>
                                { fetchLoading ? <Loader /> : undefined} 
                            </span>
                        </div>
                    </div>
                    
                    
                    <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <DarkModeButton /> 
                        {session && session.user ? session.user.name : 'logged out'}
                        <AuthButton /> 
                    </div> 

                </div>
            </div>
            
        </header>
    )
}

export default Header
