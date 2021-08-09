import React, { useContext } from 'react'

import useSWR from 'swr'
import { useSession } from 'next-auth/client'


import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import Loader from '../Loader'
import StatisticsToolbar from './StatisticsToolbar'
import DataChart from '../Charts/SummaryGraphs/DataChart'

import aggregateStats from '../../lib/statistics'


function useClickstreamSummary()  {
    let uid = session && session?.user ? session.user.email : ''
    const { data, error } = useSWR(uid && uid?.length ? `/api/slugs/user-views/${uid}` : null)
    
    return {
        summary: data ? data : [],
        loading: !data && !err,
        error: err
    };
}

const DashboardSkeleton = () => <Loader />;


const StatTables = () => {
    const { summary, loading, error } = useClickstreamSummary(email, '30')

    if(loading) return <DashboardSkeleton /> 
    if(error) return <p> Error! {error.message} </p>

    // let { maxViews, uniqueViews, totalViews, slugsByNumViews, clickstream } = summary

    return (
        <Box css={{ width: '1275px', overflowX: 'scroll', bc: 'white'}}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                <StatisticsToolbar data={finalizedData} email={email} />
                
                <Flex css={{ width:'1250px', fd:'row', jc:'space-between', ai: 'stretch', mt: '$1' }}>    
                    <Text> 
                        {JSON.stringify(summary)} 
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}


export default StatTables


// <DataTable
//     title={finalizedData[state.activeDataset.index].title}
//     variable={finalizedData[state.activeDataset.index].variable}
//     data={finalizedData[state.activeDataset.index].stat}
//     width={finalizedData[state.activeDataset.index].width}
//     loading={finalizedData[state.activeDataset.index].loading}
// /> 
    
// <DataChart
//     data={finalizedData[state.activeDataset.index].stat}
//     variable={finalizedData[state.activeDataset.index].variable}
//     title={finalizedData[state.activeDataset.index].title}
//     loading={finalizedData[state.activeDataset.index].loading}
//     type={state.activeChart || 'pie'}
// />