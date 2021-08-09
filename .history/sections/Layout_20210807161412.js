import React, { useContext } from 'react'

import { useSession } from 'next-auth/client'
import { styled } from '@stitches/react'
import { blackA } from '@radix-ui/colors'
import { useIsSSR } from '@react-aria/ssr';

import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Card } from '../primitives/Card'
import { Heading } from '../primitives/Heading'

import BreadcrumbsHeader from '../primitives/Breadcrumbs'

const NestedLayout = ({ children }) => {
    
    return (
        <Card css={{ width: '100%', height: '600px', width: '1300px', mx: '$3', bc: blackA.blackA12, border: 'thin solid silver' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai:'stretch', gap: '$3' }}>
                
                <Heading size='1'> 
                    <Flex css={{ maxHeight: '25px', width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                        <BreadcrumbsHeader /> 
                    </Flex>
                </Heading>


                <Box css={{ minHeight: '525px', border: 'thin solid silver', br: '$2',  fd: 'row', jc: 'stretch', ai: 'stretch' }}>
                    {children}
                </Box>

            </Flex>
        </Card>
    )
}

const StyledAppContainer = styled('div', {
    height: '100vh',
    width: '100%',
    margin: '0',
    padding: '0',
    backgroundColor: 'white',
    color: blackA.blackA12,
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
    const isSSR = useIsSSR(); 
   
    return (
        
        // <div className="h-screen flex">
        <StyledAppContainer>
            <Sidebar />

            <Flex css={{ fd: 'col', jc: 'flex-start', ai: 'stretch', gap: '7.5px' }}>
                <Header />
                <NestedLayout children={children} />
                <Footer />
            </Flex>
        </StyledAppContainer>
    );
}

export default Layout