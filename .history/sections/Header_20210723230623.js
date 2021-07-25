import React from 'react'

import StyledSeparator from '../primitives/Separator'
import { Flex } from '../primitives/Flex'

import DarkMode from '../components/DarkMode/index'
import DropdownMenu from '../components/Dropdown'
import SearchBar from '../components/SearchBar'
import FeedbackPopover from '../components/Feedback'


const Header = () => {
  
    return (
        <header className="w-90 mx-5 mb-10 pb-3 pt-2 shadow-md bg-white dark:bg-gray-700 items-center rounded-md">
            <div className="w-full inline-flex justify-between align-center h-full px-3 mx-auto flex-start">
                <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container h-auto">
                       <span />
                    </div>
                </div>
                
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <SearchBar />
        
                    <StyledSeparator decorative orientation="vertical" css={{ margin: '0 8.5px' }} />
                    
                    <Flex css={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                        <FeedbackPopover />
                        <DarkMode />
                        <DropdownMenu />
                    </Flex>
                </div> 

            </div>
        </header>
    )
}

export default Header
