import React, { useState, useEffect } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Flex } from '../../primitives/Flex'
import Tabulator from './Tabulator'

import useSWR from 'swr'
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

const UNKNOWN_ERROR = { 
    message: 'Unkown Error'
};

const useEdgeCache = (email: string) => {
    const { data, error } = useSWR(`/api/clicks/${email}`)

    return {
        clicks: data ? data.clicks : null,
        loading: !data && !error,
        error
    };
}

const TabulatedData = ({ data }) => {
   
    return (
        <Box css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            return (
                {data.map(function(value, index) {
                    <Text>{JSON.stringify(value).substring(50)}</Text>
                })} 
            );
        </Box>
    )
}

const TableWrapper = () => {
    const [session, sessionLoading] = useSession(); 

    let email: string = session && session?.user ? session.user.email : ''
    const  { clicks, loading, error } = useEdgeCache(email);

    if(error) return <Text> Error! {error.message} </Text>

    let isLoading = sessionLoading || loading;
    return (
        <Box css={{ p: '$1', m: '$1', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Box css={{ mh: '100%' }}>
                   { 
                          isLoading  
                        ? <p> loading... </p> 
                        : <TablulatedData data={clicks}  />
                   }
                </Box>
            </Flex>
        </Box>
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {

    // const [session, loading] = useSession()
    // const email  = !loading && session?.user ? session.user.email : ''

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
  