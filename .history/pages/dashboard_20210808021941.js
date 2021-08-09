import React from 'react'

import useSWR from 'swr' 
import { useSession } from 'next-auth/client'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'

import Loader from '../Loader'
import Layout from '../sections/Layout'

import StatisticsToolbar from '../components/StatisticsToolbar'

function useClickstreamSummary()  {
    const [session, loading] = useSession();
    let email = session && session?.user ? session.user.email : ''

    const { data, error } = useSWR(email?.length ? `/api/slugs/user-views/${email}` : null)
    
    return {
        summary: data,
        loading: loading || !data && !error,
        error: error
    };
}

const DashboardSkeleton = () => <Loader />;


const StatTables = () => {
    const { summary, loading, error } = useClickstreamSummary()

    if(loading) return <DashboardSkeleton /> 
    if(error) return <p> Error! {error.message} </p>

    return (
        <Box css={{ width: '1275px', overflowX: 'scroll', bc: 'white'}}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>                
                <StatisticsToolbar /> 

                <Flex css={{ width:'1250px', minHeight: '500px', fd:'column', jc:'space-between', ai: 'stretch', mt: '$1' }}>    
                    <Text> { JSON.stringify(Object.keys(summary)) } </Text>
                </Flex>
            </Flex>
        </Box>
    );
}


const DashboardPage = ({ metadata }) => {

    return (
        <Layout
            metadata={metadata}
            children={
                <StatTables />
            }
        />
    )
}

DashboardPage.defaultProps = {
    metadata: {
        title: 'Dashboard',
        description: 'Displays key metrics'
    }
}

export default DashboardPage