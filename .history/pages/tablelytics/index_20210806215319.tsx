import React, { useState, useEffect, useMemo } from 'react'
import { useSession} from 'next-auth/client'

import Layout from '../../sections/Layout'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import TableSkeleton from '../../components/Skeletons/TableSkeleton'
import { StyledTableContainer } from './TablePrimitives'

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

    let page = localData;

    return <GraphicalTable clicks={page} />;
}


const GraphicalTable = ({ clicks }) => {
    let data = [];

    let columns = [
        { index: 0, title: '#', field: 'id', hozAlign: 'left', width: '30' },
        { index: 1, title: 'Slug', field: 'name', hozAlign: 'left', width: 250 },
        { index: 2, title: 'Destination', field: 'destination',hozAlign: 'left', width: 120 },
        { index: 3, title: 'Country', field: 'country', hozAlign: 'left' },
        { index: 4, title: 'Location', field: 'location', hozAlign: 'left' , width: 150 },
        { index: 5, title: 'User Agent', field: 'geodata',hozAlign: 'left'  },
        { index: 6, title: 'HTTP Protocol', field: 'ipAddress', hozAlign: 'left' },
        { index: 7, title: 'IP Address', field: 'host', hozAlign: 'left' , width: 120 },
        { index: 8, title: 'Host', field: 'tlsVersion', hozAlign: 'left'  },
        { index: 9, title: 'TLS Version', field: 'httpProtocol',hozAlign: 'left'  },
        { index: 10, title: 'Timestamp', field: 'timestamp', hozAlign: 'left' },
        { index: 11, title: 'ASN', field: 'asn',  hozAlign: 'left' },
        { index: 12, title: 'Views', field: 'views' },
    ];

    clicks.map(function(value, index) {
        let headers = value.request_headers;

        data.push({
            id: index + 1,
            name: `${value.slug}`,
            destination: `${value.destination}`,
            country: `${headers.country}`,
            location: `${headers.city}, ${headers.postalCode}`,
            geodata: `${headers.longitude}, ${headers.latitude}`,
            ipAddress: `${headers.ip}`,
            host: `${headers.host}`,
            tlsVersion: `${headers.tlsVersion}`,
            httpProtocol: `${headers.httpProtocol}`,
            timestamp: `${value.timestamp}`,
            asn: `${headers.asn || '-'}`
        });
    });

    if(!clicks || !data?.length) return <TableSkeleton /> 
        
    return (
        <StyledTableContainer>
            <Box css={{ border: 'thin solid transparent', borderRadius: '5px', minHeight: '550px' }}>
                <Flex css={{ fd: 'column', jc: 'stretch', ai: 'stretch' }}>
                    <ReactTabulator
                        data={data}
                        columns={columns}
                        tooltips={true}
                        layout={"fitData"}
                    />
                </Flex>
            </Box>
        </StyledTableContainer>
    )
}


// function generateTableDataAndColumn(clicks) {
//     let data = [];
        
//     const columns = useMemo(() => [
//         { Header: '#', accessor: 'id' }, 
//         { Header: 'Slug', accessor: 'name' },
//         { Header: 'Destination URL', accessor: 'destination' },
//         { Header: 'Country', accessor: 'country' },
//         { Header: 'Location', accessor: 'location' },
//         { Header: 'Geodata', accessor: 'geodata' },
//         { Header: 'IP Address', accessor: 'ipAddress' },
//         { Header: 'Host', accessor: 'host' },
//         { Header: 'TLS Version', accessor: 'tlsVersion' },
//         { Header: 'HTTP Protocol', accessor: 'httpProtocol' },
//         { Header: 'Timestamp', accessor: 'timestamp' },
//         { Header: 'ASN', accessor: 'asn' }
//     ], []);

    
//     return { columns, data }; 
// }


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
  