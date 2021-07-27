import React from 'react'

import { Flex } from '../primitives/Flex'
import DropdownMenu from '../primitives/DropdownMenu'
import DarkMode from '../components/DarkMode/index'
import SearchBar from '../components/SearchBar'

const Header = () => {
  
    return (
        <header className="w-90 mx-5 mb-4 shadow-md bg-white dark:bg-gray-700 items-center rounded-md">
            <div className="w-full inline-flex justify-between align-center h-full px-3 mx-auto flex-start">
                
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container h-full mx-auto">
                        <SearchBar />
                    </div>
                </div>
                
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <Flex css={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                        <DarkMode />
                        <DropdownMenu />
                    </Flex>
                </div> 


            </div>
        </header>
    )
}

export default Header
