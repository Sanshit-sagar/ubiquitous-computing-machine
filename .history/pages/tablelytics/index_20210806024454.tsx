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

// const TableWrapper = ({ clickstream }) => {
//     // TODO: fetchData function for react-table here 
//     const [localData, setLocalData] = useState([]);

//    useEffect(() => {
//        if(clickstream?.length) {
//             clickstream.sort((a,b) => b.id - a.id);
//        }
//        setLocalData([...clickstream]);
//    }, [clickstream, localData]);

//     return (
//         <Box css={{ p: '$1', m: '$1', br: '$2' }}>
//             <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
//                {/* TODO: Scroll view and table header here */}
//                 <EdgeCache 
//                     clickstream={clickstream} 
//                     localData={localData} 
//                 />
//             </Flex>
//         </Box>
//     );
// }


const TablulatedData = ({ clickstream }) => {
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        if(clickstream?.length) {
             clickstream.sort((a,b) => b.id - a.id);
        }
        setLocalData([...clickstream]);
    }, [clickstream, localData]);

    // indicate progression over previous stage in the UI
    if(!localData?.length) return <TableSkeleton />;
 
    let page = localData.slice(0, 10);

     return (
         <Box css={{ p: '$1', m: '$1', br: '$2' }}>
             <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                {page.map(function(value, index) {
                    return (
                        <Text key={index}>
                            {JSON.stringify(value)}
                        </Text>
                    );
                })} 
            </Flex>
        </Box>
    );
}

const useEdgeCache = (email: string) => {
    return useSWR(email && email?.length ? `/api/clicks/${email}` : null);
}

const EdgeCache = () => {
    const [session, sessionLoading] = useSession()

    let email = session && session?.user ? session.user.email : ''
    const { data, error } = useEdgeCache(email);

    if(error) return <Text>Error! {error.message} </Text> 
    if(sessionLoading || !data) return <TableSkeleton />;

    return (
        <TablulatedData 
            clickstream={!data || !data.clicks?.length ? [] : data.clicks} 
        />
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {

    return (
        <Layout 
            metadata={metadata} 
            children={ <EdgeCache />}
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
  