import React from 'react'

import useSWR from 'swr' 
import { useSession } from 'next-auth/client'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Card } from '../primitives/Card'
import { mauve } from '@radix-ui/colors'
import { Heading } from '../primitives/Heading'
import StyledSeparator from '../primitives/Separator'

import Layout from '../sections/Layout'
import Loader from '../components/Loader'

import { Bar } from 'react-chartjs-2';

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

// const DashboardSkeleton = () => <Loader />;
const MiniTableSkeleton = () => <Loader />;

function formatTimestamp(ts) {
    return ts ? new Date(parseInt(ts)).toLocaleString().split(',')[0] : ''
}

function formatDestination(dest) {
    return dest?.length ? `${new URL(dest).hostname}` : ''
}

export const BarChart = ({ graphName, dataset, loading }) => {
    if(loading) return <Loader />;

    let freqsLabels = [];
    let freqData = [];  
    dataset.slice(0,5).map(function(value, index) {
        freqsLabels.push(value[0]); 
        freqData.push({ 'y': value[0], 'x': value[1] });
    })
    
    let graphData = {
        labels: freqsLabels,
        datasets: [{
            label: 'Uniques',
            fill: true,
            backgroundColor: 'rgba(0,169,109,0.4)',
            borderColor: 'rgba(0,169,109,1)',
            data: freqData,
        }],
    };

    return (
        <Bar
            data={graphData}
            width={400}
            height={250}
            options={{
                indexAxis: 'y',
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }}
        />
    )
}

// const MostViews = ({ dataset, title, loading }) => {
//     if(loading) return <MiniTableSkeleton />

//     if(dataset?.length) {
//         dataset = dataset.slice(0,5); 
//     }

//     return (
//         <>
//             {dataset.map(function(value, index) {
//                 if(index%2 !== 0) return ''; 
                
//                 return (
//                     <div key={index} style={{ width: '100%' }}>
//                          <Flex css={{ width: '100%', fd: 'row', jc: 'space-between',ai: 'center', gap: '$2' }}>
//                             <Text> {value} </Text> 
//                             <Text> {index<dataset.length-1 ? `${dataset[index + 1]}` : ''} </Text>
//                         </Flex>
//                     </div>
//                 );
//             })}
//         </>
//     )
// }

// const FreqTable = ({ dataset, table, loading }) => {
//     if(loading) return <MiniTableSkeleton />
    
//     if(dataset?.length) {
//         dataset = dataset.slice(0,5); 
//     }

//     return (
//         <>
//             { dataset.map(function(value, index) {
//                 return (
//                     <div key={index} style={{ width: '100%' }}>
//                         <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
//                             <Text> {value[0]} </Text>
//                             <Text> {value[1]} </Text>
//                         </Flex>
//                     </div>
//                 )
//             })}
//         </>
//     )
// }

const DataTableWrapper = ({ dataset, title, loading }) => {

    return (
        <Box css={{ border: 'thin solid silver', br: '$1', margin: '$1' }}>
            <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                <Box css={{ width: '100%', padding: '$2', height: '250px', width: '400px' }}> 
                    <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                       <BarChart graphName={title} dataset={dataset} loading={loading} />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}


const StatTables = () => {
    const { summary, loading, error } = useClickstreamSummary()

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
        <Box css={{ height: '100%', width: '100%', height: '575px', overflowY: 'hidden', overflowX: 'hidden', pt: '$1' }}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', flexWrap: 'wrap', gap: '$2' }}>                
                
                {datasets.map(function(value, index) {
                    return (
                        <div key={index}> 
                            <DataTableWrapper
                                dataset={value.data}
                                title={value.title}
                                loading={loading}
                            />
                        </div>
                    );
                })}
            
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