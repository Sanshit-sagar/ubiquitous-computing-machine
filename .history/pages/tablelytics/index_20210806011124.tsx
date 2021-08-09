import React, { useState, useEffect } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Flex } from '../../primitives/Flex'
import Tabulator from './Tabulator'

import { NewSlugStore } from '../../store'
import useSWR from 'swr'

interface IMetadataProps {
    title: string;
    description: string; 
}

interface ITablelyticsProps {
    metadata: IMetadataProps;
    title: string | null;
    users: any;
}

const useEdgeCache = (email) => {
    const { data, error } = useSWR(`/api/clicks/${email}`)

    return {
        clicks: data,
        loading: !data && !error,
        error
    };
}

const TableWrapper = () => {
    const [session, sessionLoading] = useSession(); 
    
    const [renders, setRenders] = useState(0);
    const [data, setData] = useState([]);

    let email = session && session?.user ? session.user.email : ''
    // const  { clicks, loading, error } = useEdgeCache(email);

    useEffect(() => {
        if(session && session?.user) {
            let email = session.user.email;

            fetch("https://analyticly.hashably.workers.dev/api/sanshit.sagar@gmail.com",  {
                method: 'GET',
                redirect: 'follow'
            })
            .then((response) => {response.text()})
            .then((result) => {
                let temp = []; 
                if(result?.clicks?.length) {
                    result.clicks.map(function(val,i) {
                        temp.push({
                            value: val,
                            'index': i, 
                        });
                    });
                } 
                setData(temp);
                setRenders(renders + 1); 
            })
            .catch((error) => {
                console.log('error', error)
            });
        }
    }, []); 

    if(error) return <Text> ERROR! </Text>;
    
    return (
        <Box css={{ p: '$1', m: '$1', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Box css={{ mh: '100%' }}>
                   <
                </Box>
            </Flex>
        </Box>
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {

    const [session, loading] = useSession()
    const email  = !loading && session?.user ? session.user.email : ''

    return (
        <Layout 
            metadata={metadata} 
            children={
                <TableWrapper 
                    filter="allViews" 
                    email={email}
                />
            }
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
  