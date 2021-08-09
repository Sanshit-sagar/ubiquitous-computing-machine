import React, { useState, useEffect } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Flex } from '../../primitives/Flex'
import Tabulator from './Tabulator'

import useSWR from 'swr'
import TableSkeleton from '../../components/Skeletons/TableSkeleton'
import toast from 'react-hot-toast'

interface IMetadataProps {
    title: string;
    description: string; 
}

interface ITablelyticsProps {
    metadata: IMetadataProps;
    title: string | null;
    users: any;
}

const useEdgeCache = (email: string) => {
    return useSWR(email && email?.length ? `/api/clicks/${email}` : null);
}

const TablulatedData = ({ data }) => {
    if(!data) return <TableSkeleton />;

    let page = Object.entries(data);
   
    return (
        <Box css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            {page.map(function(value, index) {
                return (
                    <Text key={index}>
                        {JSON.stringify(value)}
                    </Text>
                );
            })} 
        </Box>
    );
}


const EdgeCache = () => {
    const [session, sessionLoading] = useSession()

    let email = session && session?.user ? session.user.email : ''
    const { data, error } = useEdgeCache(email);

    if(error) return <Text>Error! {error.message} </Text> 
    if(sessionLoading || !data) return <TableSkeleton />;

    return (
        <TablulatedData data={data ? data.clicks : {}} />
    );
}

const TableWrapper = () => {
    // TODO: fetchData function for react-table here 
   
    return (
        <Box css={{ p: '$1', m: '$1', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
               {/* TODO: Scroll view and table header here */}
                  <EdgeCache />
            </Flex>
        </Box>
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {

    return (
        <Layout 
            metadata={metadata} 
            children={ <TableWrapper />}
        />
    );
}

export default TablelyticsWrapper 

TablelyticsWrapper.defaultProps = {
    metadata: { 
        title: 'Tablelytics', 
        description: 'Testing tables'
    }
}
  