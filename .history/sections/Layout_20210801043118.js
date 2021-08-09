import React, { useState, useContext } from 'react'
import {useRouter} from 'next/router'

import { Toaster, toast } from 'react-hot-toast'
import { GlobalStore } from '../store'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
// import SharedModal from './SharedModal'


const NestedLayout = ({ children }) => {

    return (
            <Layout metadata={metadata}>
                <Card css={{ width: '100%', minHeight: '625px', display: 'flex', fd: 'column', jc: 'flex-start', ai:'stretch' }}>
                <Heading size='1'> 
                    <Box>
                        <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                            <BreadcrumbsHeader /> 
                            <TimeSinceUpdate /> 
                        </Flex>

                        <Box css={{ my: '$1' }}>
                            <StyledSeparator />
                        </Box>
                    </Box>   
                </Heading>

                <Flex css={{ mt: '$1', backgroundColor: 'snow', border: 'thin solid silver', br: '$2' }}>
                    {children}
                </Flex>
            </Card>
        </Layout>
    );
}



function Layout({ children, metadata }) {
    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)


    const renavigate = (route) => {
        if(route !== state.currentPage) {
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${route}`,
                    value: `${route}`,
                }
            });
            router.push(`${route}`)
            toast.success(`Navigated to ${state.currentPage}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

    const sendToasty = (toastyMessage) => {
        if(toastyMessage && toastyMessage?.length) {
            console.log('proxying message to toaster')
            toast.message(`${toastyMessage}`)
        }
    }
   
    return (
    
        <div className="h-screen flex">

            <div className="w-full inline-flex space-between items-stretch">
                <Sidebar 
                    handleNavigation={renavigate}
                    broadcastToast={sendToasty}
                /> 

                <div className="w-full h-full flex-col justify-start items-stretch order-last">
                    {/* <SharedModal />  */}

                    <Header handleNavigation={renavigate} broadcastToast={sendToasty} />

                    <NestedLayout>
                        {children}
                    </NestedLayout>
                    
                    <Footer handleNavigation={renavigate} broadcastToast={sendToasty} />
                </div>
            </div>
        </div>
    );
}


export default Layout