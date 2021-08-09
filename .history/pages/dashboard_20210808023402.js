import React from 'react'

import useSWR from 'swr' 
import { useSession } from 'next-auth/client'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Card } from '../primitives/Card'
import { Heading } from '../primitives/Heading'
import StyledSeparator from '../primitives/Separator'

import Layout from '../sections/Layout'
import Loader from '../components/Loader'
import StatisticsToolbar from '../components/StatTables/StatisticsToolbar'

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

const DataTable = ({ dataset, title }) => {
    return (
        <Box css={{ border: 'thin solid black', br: '$2', bc: 'white', margin: '$2' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                <Heading> {title} </Heading>
                <StyledSeparator orientation="horizontal" /> 
                <Box css={{ padding: '$2', height: '400px', overflowY: 'scroll' }}> 
                    <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                        <Text> { dataset.slug } </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}


const StatTables = () => {
    const { summary, loading, error } = useClickstreamSummary()

    if(loading) return <DashboardSkeleton /> 
    if(error) return <p> Error! {error.message} </p>

    let clickstream = summary.clickstream;
    let mostViewed = summary.slugsByPopularity;

    return (
        <Card interactive={true} ghost active={true} css={{ height: '100%', width: '100%', minHeight: '525px' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>                
                <StatisticsToolbar /> 

                <Flex css={{ fd:'column', jc:'space-between', ai: 'stretch', mt: '$1' }}>    
                    <DataTable dataset={clickstream} title={'Recent Views'} />
                    <DataTable dataset={mostViewed} title={'Most Viewed Slugs'} /> 
                </Flex>
            </Flex>
        </Card>
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