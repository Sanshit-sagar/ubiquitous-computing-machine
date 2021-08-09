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

function useClickstreamSummary()  {
    const [session, loading] = useSession();
    let email = session && session?.user ? session.user.email : ''

    const { data, error } = useSWR(email?.length ? `/api/slugs/user-views/${email}` : null)
    
    return {
        summary: data || {},
        loading: loading || !error && !data,
        error: error
    };
}

const DashboardSkeleton = () => <Loader />;
const MiniTableSkeleton = () => <Loader />;

function formatTimestamp(ts) {
    return ts ? new Date(parseInt(ts)).toLocaleString().split(',')[0] : ''
}

function formatDestination(dest) {
    return dest?.length ? `${new URL(dest).hostname}` : ''
}

const RecentViews = ({ dataset }) => {

    return (
        <>
            {dataset.map(function(datum, index) {
                return (
                    <div key={index}>
                        <Flex css={{ width: '100%',  fd: 'row', jc: 'space-between',ai: 'center', gap: '$2' }}>
                            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}> 
                                <Text> {datum?.slug || '-'} </Text> 
                                <Text> {datum?.destination ? formatDestination(datum.destination) : '-'} </Text>     
                            </Flex>
                            <Text> {datum?.timestamp || ''} </Text> 
                        </Flex>
                    </div>
                );
            })}
        </>
    )
}

const MostViews = ({ dataset, title }) => {

    return (
        <>
            {dataset.map(function(value, index) {
                if(index%2!==0) return ''; 
                return (
                    <div key={index} style={{ width: '100%' }}>
                         <Flex css={{ width: '100%', fd: 'row', jc: 'space-between',ai: 'center', gap: '$2' }}>
                            <Text>{value}</Text> 
                            <Text> {index<dataset.length-1 ? `${dataset[index + 1]}` : ''} </Text>
                        </Flex>
                    </div>
                );
            })}
        </>
    )
}

const FreqTable = ({ dataset, table }) => {

    return (
        <>
            { dataset.map(function(value, index) {
                return (
                    <div key={index} style={{ width: '100%' }}>
                        <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
                            <Text> {value[0]} </Text>
                            <Text> {value[1]} </Text>
                        </Flex>
                    </div>
                )
            })}
        </>
    )
}

const DataTableWrapper = ({ dataset, title }) => {
    if(!dataset) return <MiniTableSkeleton />

    return (
        <Box css={{ border: 'thin solid black', br: '$2', bc: 'white', margin: '$2', width: '350px', overflowX: 'hidden' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                <Heading> {title} </Heading>
                <StyledSeparator orientation="horizontal" /> 
                <Box css={{ width: '100%', padding: '$2', height: '250px', overflowY: 'scroll' }}> 
                    <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                       {
                              title==='Recent Views' ? <RecentViews dataset={dataset} /> 
                            : title==="Most Views" ? <MostViews  dataset={dataset} title={title} />
                            : <FreqTable dataset={dataset} title={title} />
                        }
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

    let datasets = [
        // { id: 0, data: summary.clickstream, title: 'Recent Views', size: 'lg' },
        { id: 1, data: summary.slugsByPopularity, title: 'Most Views', size: 'md' },
        { id: 2, data: summary.ips, title: 'IP Addresses', size: 'md'},
        { id: 3, data: summary.destinations, title: 'Destinations', size: 'md'},
        { id: 4, data: summary.engines, title: 'Engines', size: 'md' },
        { id: 5, data: summary.operatingSystems, title: 'Operating Systems', size: 'md' },
        { id: 6, data: summary.browsers, title: 'Browsers', size: 'md' }
    ];

    return (
        <Card interactive={true} ghost active={true} css={{ height: '100%', width: '100%', height: '520px' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$2' }}>                
                {/* <StatisticsToolbar />  */}
                <Box css={{ width: '100%', height: '500px', overflowY: 'scroll' }}>
                    <Flex css={{ fd:'row', jc:'flex-start', ai: 'stretch', maxWidth: '1250px', flexWrap: 'wrap', mt: '$1' }}>  
                        {datasets.map(function(value, index) {
                            return (
                                <div key={index}> 
                                    <DataTableWrapper
                                        dataset={value.data}
                                        title={value.title}
                                    />
                                </div>
                            );
                        })}
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