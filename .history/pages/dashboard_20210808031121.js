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

function formatTimestamp(ts) {
    return new Date(ts).toLocaleString();
}

function formatDestination(dest) {
    return new URL(datum.click.destination).hostname;
}

const DataRow = ({ dataset, title }) => {
    return (
        <>
            {dataset.map(function(datum, index) {
                                
                return (
                    <div key={index}>
                        <Flex css={{ fd: 'row', jc: 'flex-start',ai: 'center', gap: '$2' }}>
                            <Text> {datum?.click?.slug || '-'} </Text> 
                            <Text> {datum?.click?.destination ? formatDestination(datum.click.timestamp) : '-'} </Text> 
                            <Text> {datum?.click?.timestamp ? formatTimestamp(datum.click.timestamp) : '-'} </Text>
                        </Flex>
                    </div>
                )
            })}
        </>
    )
}

const DataTable = ({ dataset, title }) => {
    if(!dataset) return <Text> 'nathing'</Text>
    return (
        <Box css={{ border: 'thin solid black', br: '$2', bc: 'white', margin: '$2', width: '400px', overflowX: 'hidden' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                <Heading> {title} </Heading>
                <StyledSeparator orientation="horizontal" /> 
                <Box css={{ padding: '$2', height: '250px', overflowY: 'scroll' }}> 
                    <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                       <DataRow 
                            dataset={dataset} 
                            title={title} 
                        />
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
                <Box css={{ padding: '$1', height: '450px', overflowY: 'scroll' }}>
                    <Flex css={{ fd:'row', jc:'space-between', ai: 'stretch', mt: '$1' }}>  
                        <DataTable dataset={clickstream} title={'Recent Views'} />
                        <DataTable dataset={mostViewed} title={'Most Viewed Slugs'} /> 
                    </Flex>
                </Box>
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