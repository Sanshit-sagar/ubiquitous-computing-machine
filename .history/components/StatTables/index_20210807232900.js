import React, { useContext } from 'react'
// import { Button } from '@blueprintjs/core'
// import ScrollView from '../../primitives/ScrollView'

// import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import useSWR from 'swr'
import Loader from '../Loader'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'


import StatisticsToolbar from './StatisticsToolbar'
import DataChart from '../Charts/SummaryGraphs/DataChart'

import aggregateStats from '../../lib/statistics'
import { NewSlugStore } from '../../store'


function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const DataTable = ({ clickstream, loading, error }) => {
    
    if(loading) return <Loader /> 
    if(error) return <p> error! </p> 

    return (
        <Box css={{ width: '350px', width: '350px', border: 'thin solid black' }}>
            <p> {JSON.stringify(clickstream)} </p>
        </Box>
    )
}

const StatTables = () => {
    const [session, userLoading] = useSession(); 
    let email = session && session?.user ? session.user.email : '';

    const state = useContext(NewSlugStore.State)

    const { clickstream, loading, error } = useUserClickstreams(email, '30')
    // const { sortedCountries, sortedIps, sortedDestinations, userAgents, skipped, count } = aggregateStats({ clickstream, loading, error })
    

    const finalizedData = [
        { index: '0', title: 'Top Destinations', variable: 'destinations', stat: sortedDestinations, loading: loading },
        { index: '2', title: 'Top Countries', variable: 'country', stat: sortedCountries, loading: loading },
        { index: '3', title: 'Top IP Addresses', variable: 'ip', stat: sortedIps, loading: loading},
    ];

    if(error) {
        return (
            <p> Error! {error.message} </p>
        )
    }

    return (
        <Box css={{ width: '1275px', overflowX: 'scroll', bc: 'white'}}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                <StatisticsToolbar data={finalizedData} email={email} />
                
                <Flex css={{ width:'1250px', fd:'row', jc:'space-between', ai: 'stretch' }}>    
                    <DataTable
                        title={finalizedData[state.activeDataset.index].title}
                        variable={finalizedData[state.activeDataset.index].variable}
                        data={finalizedData[state.activeDataset.index].stat}
                        width={finalizedData[state.activeDataset.index].width}
                        loading={finalizedData[state.activeDataset.index].loading}
                    /> 
                        
                    <DataChart
                        data={finalizedData[state.activeDataset.index].stat}
                        variable={finalizedData[state.activeDataset.index].variable}
                        title={finalizedData[state.activeDataset.index].title}
                        loading={finalizedData[state.activeDataset.index].loading}
                        type={state.activeChart || 'pie'}
                    />
                </Flex>
            </Flex>
        </Box>
    );
}


export default StatTables