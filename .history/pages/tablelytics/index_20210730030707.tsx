import React, { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/client'
import StackedLayout from '../../sections/StackedLayout'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Flex } from '../../primitives/Flex'
import { Heading } from '../../primitives/Heading'
import StyledSeparator from '../../primitives/Separator'
import BreadcrumbsHeader from '../../primitives/Breadcrumbs'

import { NewSlugStore } from '../../store'
import Loader from '../../components/Loader'
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

interface IUsersProps {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    destination: string;
    published: boolean;
    userEmail: string;  
}

interface IUserSlugsProps {
    users: IUsersProps[] | null;
    loading: boolean;
    error: any | null; 
}

const useUserSlugs = () => {
    const { data, error } = useSWR('/api/users/slugs');

    let response: IUserSlugsProps = { 
        users: data, 
        loading: !data && !error, 
        error 
    }

    return response; 
};

const useEdgeCache = (email) => {
    const { data, error } = useSWR(`/api/clicks/${email}`)

    return {
        clicks: data,
        loading: !data && !error,
        error
    };
}

const TabulatedData = () => {
    const [session, sessionLoading] = useSession()

    const [doFetch, setDoFetch] = useState(true); 
    const [renders, setRenders] = useState(0);
    const [data, setData] = useState([]);

    let email = session && session?.user?.email ? session.user.email : '';
    const  { clicks, loading, error } = useEdgeCache(email);

    useEffect(() => {
        if(!sessionLoading && !loading && clicks && doFetch) {
            let tempData = [];
            
            Object.entries(clicks).map(function(entry, index) {
                tempData.push({...entry}); 
            });

            setRenders(renders + 1);
            setDoFetch(false);
            setData([...tempData]); 
        }
    }, [loading, clicks, data, doFetch, renders]); 

    if(error) return <Text> ERROR! </Text>;
    
    return (
        <Box css={{ p: '$1', m: '$1', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Box css={{ mh: '100%' }}>
                    <Text>
                        {data?.length ? JSON.stringify(data) : <Loader />}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

const TimeSinceUpdate = () => {
    const state = useContext(NewSlugStore.State)

    return (
        <Box css={{ p: '$1', bc: 'gray', border: 'thin solid black' }}>
            <Text> {state.lastUpdatedAt}  </Text>
        </Box>
    )
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {
    const [session, loading] = useSession()
    
    return (
        <StackedLayout pageMeta={metadata}>
            <Card css={{ width: '100%', minHeight: '625px', display: 'flex', fd: 'column', jc: 'flex-start', ai:'stretch' }}>
                <Box>
                    <Heading size='1'> 
                        <BreadcrumbsHeader /> 
                    </Heading>
                
                    <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                        <TimeSinceUpdate /> 
                    </Flex>

                    <Box css={{ my: '$1' }}>
                        <StyledSeparator />
                    </Box>
                </Box>   

                

                <Box>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        <TabulatedData />
                    </Flex>
                </Box>
            </Card>
        </StackedLayout>
    );
}

export default TablelyticsWrapper

TablelyticsWrapper.defaultProps = {
    metadata: { 
        title: 'Tablelytics', 
        description: 'Testing tables'
    }
}
  