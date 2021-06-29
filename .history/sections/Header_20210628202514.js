import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import DarkModeButton from '../components/DarkModeButton/index'
import Loader from '../components/Loader'

import Dropdown from '../buildingBlocks/Dropdown'
import {Input} from '@supabase/ui'
import { LockClosedIcon } from '@heroicons/react/solid'


const Header = () => {
    const [session, loading] = useSession()

    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (activeSlug) {
            setActiveSlug(activeSlug.toLowerCase())
        }
    }, [activeSlug])

    return (
        <header className="w-90 mx-5 mb-10 shadow-md bg-white items-center h-18 rounded-md">
            <div className="w-full inline-flex justify-between align-center h-full px-3 mx-auto flex-start">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container w-1/2 h-auto">
                        {   loading ? <Loader /> : 
                            !session || !session.user ? <LockClosedIcon />  :
                            <Input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search"
                                disabled={loading}
                                type="text"
                            /> 
                        }
                   </div>
                </div>
                
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    {loading ?  <Loader /> : !session && !user ?  <LockedComponent /> :  <DarkModeButton />}
                    <Dropdown />
                </div> 

            </div>
        </header>
    )
}

export default Header
