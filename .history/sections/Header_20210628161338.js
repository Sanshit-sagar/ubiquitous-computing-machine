import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import DarkModeButton from '../components/DarkModeButton/index'
import Loader from '../components/Loader'
import { 
    InputContainerSvg, 
    SearchIconSvg, 
} from '../buildingBlocks/svgIcons'
// import AuthButton from '../components/Auth/AuthButton'
import Dropdown from '../buildingBlocks/Dropdown'
import {Input} from '@supabase/ui'

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
            <div className="w-full inline-flex flex-col justify-center h-full px-3 mx-auto flex-center">
                    
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 h-auto">
                        <SearchIconSvg />
                        <Input
                            label="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="   Search"
                            disabled={fetchLoading}
                            icon={ <SearchIconSvg />}
                            type="email"
                        />
                        
                        <span> {fetchLoading ? <Loader /> : undefined} </span>
                    </div>
                </div>
                
                
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <DarkModeButton /> 
                    <Dropdown /> 
                </div> 

            </div>
        </header>
    )
}

export default Header
