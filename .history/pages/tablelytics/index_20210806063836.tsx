import React, { useState, useEffect } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import TableSkeleton from '../../components/Skeletons/TableSkeleton'

import useSWR from 'swr'
import 'react-tabulator/lib/styles.css'
import 'react-tabulator/lib/css/tabulator.min.css'
import { ReactTabulator } from 'react-tabulator'


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

    let page = localData.slice(0, 20);

     return <GraphicalTable clicks={page} />;
}


const GraphicalTable = ({ clicks }) => {

    return (
        <StyledTableContainer>
            <Tabultor dataset={clicks} />
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
  