import React, { useContext } from 'react'

import useSWR from 'swr'
import { useSession } from 'next-auth/client'


import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import Loader from '../Loader'
import StatisticsToolbar from './StatisticsToolbar'
import DataChart from '../Charts/SummaryGraphs/DataChart'

import aggregateStats from '../../lib/statistics'
import { NewSlugStore } from '../../store'


function useUserClickstreams()  {
    let uid = session && session?.user ? session.user.email : ''
    const { data, error } = useSWR(uid && uid?.length ? `/api/slugs/user-views/${uid}` : null)
    
    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}

const DashboardSkeleton = () => <Loader />;


const StatTables = () => {
    const { clickstream, loading, error } = useUserClickstreams(email, '30')

    if(loading) return <DashboardSkeleton /> 
    if(error) return <p> Error! {error.message} </p>

    return (
        <Box css={{ width: '1275px', overflowX: 'scroll', bc: 'white'}}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                <StatisticsToolbar data={finalizedData} email={email} />
                
                <Flex css={{ width:'1250px', fd:'row', jc:'space-between', ai: 'stretch', mt: '$1' }}>    
                    <Text> 
                        {JSON.stringify(clickstream)} 
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