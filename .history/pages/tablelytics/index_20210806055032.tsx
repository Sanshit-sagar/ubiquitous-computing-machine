import React, { useState, useEffect } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import useSWR from 'swr'
import TableSkeleton from '../../components/Skeletons/TableSkeleton'
import { StyledTableContainer, StyledTableHeader, StyledCell } from './TablePrimitives'


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

const useEdgeCache = (email: string) => {
    return useSWR(email && email?.length ? `/api/clicks/${email}` : null);
}

const EdgeCache = () => {
    const [session, sessionLoading] = useSession()

    let email = session && session?.user ? session.user.email : ''
    const { data, error } = useEdgeCache(email);

    // TODO: replace this and other components with error states  
    if(error) return <Text> Error! {error.message} </Text> 
    if(sessionLoading || !data) return <TableSkeleton />;

    return (
        <TablulatedData 
            clickstream={!data || !data.clicks?.length ? [] : data.clicks} 
        />
    );
}

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

     return <GraphicalTable clicks={page} />;
}


let data = [
    { row: 0, name: 'Slug', accessor: slug, component: StyledCell, long: true },
    { row: 1, name: 'Destination', accessor: slug, component: StyledCell,  long: false },
    { row: 2, name: 'Country', accessor: slug, component: CountryCell, long: false },
    { row: 3, name: 'Location', accessor: slug, component: GeodataCell,  long: true },
    { row: 4, name: 'User Agent', accessor: slug, component: UserAgentCell, long: true },
    { row: 5, name: 'HTTP Protocol', accessor: slug, component: StyledCell, long: false },
    { row: 6, name: 'IP Address', accessor: slug, component: StyledCell, long: false },
    { row: 7, name: 'Host', accessor: slug,component: StyledCell,  long: false },
    { row: 8, name: 'TLS Version', accessor: slug, component: StyledCell, long: true },
    { row: 9, name: 'Timestamp', accessor, component: TimestampCell, long: false },
    { row: 10, name: 'asn', accessor: slug, component: StyledCell, long: true },
    { row: 11, name: 'Views', accessor: views, component: ViewsCell, long: true },
];



const GraphicalTable = ({ clicks }) => {
    let headings = data;


    return (
        <StyledTableContainer>
            <StyledTableHeader> 
                {headings.map(function(value, index){
                    return (
                        <StyledCell>
                            {value.name}
                        </StyledCell>
                    );
                })}
            </StyledTableHeader>
        </StyledTableContainer>
    )
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
  