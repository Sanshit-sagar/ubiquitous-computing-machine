import React, { useContext } from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

import { Flex } from '../primitives/Flex'
import { Card } from '../primitives/Card'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Heading } from '../primitives/Heading'

import StyledSeparator from '../primitives/Separator'
import BreadcrumbsHeader from '../primitives/Breadcrumbs'

import { GlobalStore, NewSlugStore, GraphStore } from '../store'

const CustomPageActionsToolbar = () => {

    return (
        <Card interactive={true} ghost active={true} css={{ bc: 'black', width: '250px', maxHeight: '20px' }}>
            <Box css={{ border: 'thin solid white', borderRadius: '5px' }}>
                <Text> oooooyyooy </Text>
            </Box>
        </Card>
    )
}

const NestedLayout = ({ children }) => {
    return (
        <Card css={{ width: '100%', height: '600px', width: '1300px', mx: '$3' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai:'stretch' }}>
                <Heading size='1'> 
                    <Flex css={{  maxHeight: '25px', width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                        <BreadcrumbsHeader /> 
                        <CustomPageActionsToolbar /> 
                    </Flex>

                    <Box css={{ mt: '$1', mb: '$3' }}>
                        <StyledSeparator />
                    </Box>
                </Heading>


                <Box css={{ bc: 'snow', border: 'thin solid silver', br: '$2', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    {children}
                </Box>
            </Flex>
        </Card>
    )
}


function Layout({ children, metadata }) {
    // const router = useRouter()
    // const state = useContext(GlobalStore.State)
    // const dispatch = useContext(GlobalStore.Dispatch)


    // const renavigate = (route) => {
    //     if(route !== state.currentPage) {
    //         dispatch({
    //             type: 'navigate',
    //             payload: {
    //                 route: `${route}`,
    //                 value: `${route}`,
    //             }
    //         });
    //         router.push(`${route}`)
    //         toast.success(`Navigated to ${state.currentPage}`)
    //     } else {
    //         toast.error(`Already at ${route}`)
    //     }
    // }

    // const sendToasty = (toastyMessage) => {
    //     if(toastyMessage && toastyMessage?.length) {
    //         console.log('proxying message to toaster')
    //         toast.message(`${toastyMessage}`)
    //     }
    // }
    
   
    return (
        <div className="h-screen flex">

            <div className="w-full inline-flex space-between items-stretch">
                <Sidebar />

                <Flex css={{ fd: 'col', jc: 'flex-start', ai: 'stretch', gap: '7.5px' }}>
                    <Header />
                    <NestedLayout children={children} />
                    <Footer />
                </Flex>

            </div>
        </div>
    );
}

export default Layout