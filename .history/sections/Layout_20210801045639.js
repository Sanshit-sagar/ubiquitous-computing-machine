import React, { useContext } from 'react'
// import {useRouter} from 'next/router'

import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import BreadcrumbsHeader from './BreadcrumbsHeader'
import TimeSinceUpdate from './TimeSinceUpdate'


import { Flex } from '../primitives/Flex'
import { Card } from '../primitives/Card'
import { Box } from '../primitives/Box'
import StyledSeparator from '../primitives/Separator'

import { GlobalStore, NewSlugStore } from '../store'
// import toast from 'react-hot-toast'
// import { LayoutIcon } from '@radix-ui/react-icons'

const TimeSinceUpdate = () => {
    const state = useContext(NewSlugStore.State)

    return (
        <Box css={{ p: '$1', bc: 'gray', border: 'thin solid black' }}>
            <Text> {state.lastUpdatedAt}  </Text>
        </Box>
    )
}

const NestedLayout = () => {
    return (
        <Card css={{ width: '100%', minHeight: '625px', display: 'flex', fd: 'column', jc: 'flex-start', ai:'stretch' }}>
            <Heading size='1'> 
                <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                    <BreadcrumbsHeader /> 
                    <TimeSinceUpdate /> 
                </Flex>

                <Box css={{ my: '$1' }}>
                    <StyledSeparator />
                </Box>
            </Heading>


            <Box css={{ bc: 'snow', border: 'thin solid silver', br: '$2', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                {children}
            </Box>
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

                <div className="w-full h-full flex-col justify-start items-stretch order-last">
                    <Header />
                        
                    <NestedLayout />

                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default GlobalLayout