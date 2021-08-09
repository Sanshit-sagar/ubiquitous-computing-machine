import React, { useState, useEffect, useContext } from 'react'

import Layout from '../../sections/Layout'
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

    return { 
        users: data, 
        loading: !data && !error, 
        error 
    }
};

// const useEdgeCache = (email) => {
//     const { data, error } = useSWR(`/api/clicks/${email}`)

//     return {
//         clicks: data,
//         loading: !data && !error,
//         error
//     };
// }

const DisplayData = ({ data }) => {

    return (
        <p> eueue </p>
    )
}

const NoDataState = () => {
    return (
        <p> No Data to show </p>
    )
}

const TabulatedData = () => {
    const [doFetch, setDoFetch] = useState(true); 
    const [renders, setRenders] = useState(0);
    const [data, setData] = useState([]);

    const  { users, loading, error } = useUserSlugs();

    useEffect(() => {
        if(!loading && users && doFetch) {
            let tempData = [];
            
            Object.entries(users).map(function(entry, index) {
                tempData.push({ 
                    'key': entry[0],
                    'value': entry[1]
                });
            });

            setRenders(renders + 1);
            setDoFetch(false);
            setData([...tempData]); 
        }
    }, [loading, users, data, doFetch, renders]); 

    if(error) return <Text> ERROR! </Text>;
    
    return (
        <Box css={{ p: '$1', m: '$1', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Box css={{ mh: '100%' }}>
                   { data ? <DisplayData data={data} /> : <NoDataState /> }
                </Box>
            </Flex>
        </Box>
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {
    
    return (
    //     <Layout metadata={metadata}>
    //         <Card css={{ width: '100%', minHeight: '625px', display: 'flex', fd: 'column', jc: 'flex-start', ai:'stretch' }}>
    //             <Heading size='1'> 
    //                 <Box>
    //                     <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch' }}>
    //                         <BreadcrumbsHeader /> 
    //                         <TimeSinceUpdate /> 
    //                     </Flex>

    //                     <Box css={{ my: '$1' }}>
    //                         <StyledSeparator />
    //                     </Box>
    //                 </Box>   
    //             </Heading>

        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <TabulatedData />
            </Flex>
        </Box>
        //     </Card>
        // </Layout>
    );
}

export default TablelyticsWrapper 

TablelyticsWrapper.defaultProps = {
    metadata: { 
        title: 'Tablelytics', 
        description: 'Testing tables'
    }
}
  