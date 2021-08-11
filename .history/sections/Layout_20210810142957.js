import React, { useContext } from 'react'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Card } from '../primitives/Card'
import { Heading } from '../primitives/Heading'
import BreadcrumbsHeader from '../primitives/Breadcrumbs'
import Dropdown from '../primitives/DropdownMenu'
import SearchBar from '../components/SearchBar'
import DarkMode from '../components/DarkMode';
import Sidebar from './Sidebar'

import { darkTheme, theme as lightTheme } from '../stiches.config'
import { styled } from '@stitches/react'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const darkModeAtom = atomWithStorage('darkMode', false)

const StyledAppContainer = styled('div', {
    height: '100vh',
    width: '100%',
    margin: '0',
    padding: '$2',
    backgroundColor: '$hiContrast',
    color: '$hiContrast',
    border: '0px',
    borderColor: 'transparent',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
    gap: '0',
    overflowY: 'hidden',
    overflowX: 'hidden',
})

export const NestedLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
  
    return (
        <Card css={{ width: '1300px', height: '97.5vh', width: '100%', bc: '$loContrast', border: 'thin solid silver' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai:'stretch', gap: '$2' }}>
                <Heading size='1'> 
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                        <BreadcrumbsHeader /> 
                        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'stretch', gap: '$2'}}>
                            <SearchBar /> 
                            <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                            <Dropdown />
                        </Flex>
                    </Flex>
                </Heading>
                <Box css={{ height: '100%', width: '100%', fd: 'row', jc: 'stretch', ai: 'stretch' }}>
                    {children}
                </Box>
            </Flex>
        </Card>
    );
}

function Layout({ children }) {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <Provider>
            <StyledAppContainer className={darkMode ? darkTheme : lightTheme}>
                <Sidebar />
                <Flex css={{ fd: 'col', jc: 'flex-start', ai: 'stretch', gap: '$1', mx: '$2' }}>
                    <NestedLayout>
                        {children} 
                    </NestedLayout>
                </Flex>
            </StyledAppContainer>
        </Provider>
    );
}

export default Layout