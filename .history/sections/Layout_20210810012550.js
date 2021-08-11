import React, { useContext } from 'react'

// import { useSession } from 'next-auth/client'
import { styled } from '@stitches/react'
import { blackA } from '@radix-ui/colors'
// import { useIsSSR } from '@react-aria/ssr';

// import Header from './Header'
// import Footer from './Footer'
import Sidebar from './Sidebar'
import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Card } from '../primitives/Card'
import { Heading } from '../primitives/Heading'

import BreadcrumbsHeader from '../primitives/Breadcrumbs'
import SearchBar from '../components/SearchBar'
import Dropdown from '../primitives/DropdownMenu'

import { darkTheme, theme as lightTheme } from '../stiches.config'
import { GlobalStore } from '../store/GlobalStore'
import DarkMode from '../components/DarkMode';

const Header = () => {
    return (
        <Heading size='1'> 
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                <BreadcrumbsHeader /> 
                <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'stretch', gap: '$2'}}>
                    <SearchBar /> 
                    <DarkMode />
                    <Dropdown />
                </Flex>
            </Flex>
        </Heading>
    )
}

const NestedLayout = ({ children }) => {
    const uiState = useContext(GlobalStore.State)

    return (
        <div className={uiState.darkMode ? darkTheme : lightTheme}>
            <Card css={{ width: '1300px', height: '97.5vh', width: '100%', bc: '$loContrast', border: 'thin solid silver' }}>
                <Flex css={{  fd: 'column', jc: 'flex-start', ai:'stretch', gap: '$2' }}>
                    <Header />
                    <Box css={{ height: '100%', width: '100%', fd: 'row', jc: 'stretch', ai: 'stretch' }}>
                        
                            {children}
                    
                    </Box>
                </Flex>
            </Card>
        </div>
    );
}

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


function Layout({ children, metadata }) {
    // const isSSR = useIsSSR(); 
    return (
        <StyledAppContainer>
            <Sidebar />
            <Flex css={{ fd: 'col', jc: 'flex-start', ai: 'stretch', gap: '$1', mx: '$2' }}>
                <NestedLayout children={children} />
            </Flex>
        </StyledAppContainer>
    );
}

export default Layout