import React, { useRef } from 'react'

import 'react-tabulator/lib/styles.css'
import 'react-tabulator/lib/css/tabulator.min.css'
import { ReactTabulator } from 'react-tabulator'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import TableSkeleton from '../../components/Skeletons/TableSkeleton'

interface ITabulatorProps {
    dataset: string;
}


function generateData(clicks) {
    let data = [];
    
    clicks.map(function(value, index) {
        let headers = value.request_headers;

        data.push({
            id: index + 1,
            name: `${value.slug}`,
            destination: `${value.destination}`,
            country: `${headers.country}`,
            location: `${headers.city}, ${headers.postalCode}`,
            coordinates: `${headers.longitude}, ${headers.latitude}`,
            ipAddress: `${headers.ip}`,
            host: `${headers.host}`,
            tlsVersion: `${headers.tlsVersion}`,
            httpProtocol: `${headers.httpProtocol}`,
            timestamp: `${value.timestamp}`,
            asn: `${headers.asn || '-'}`
        });
    });

    return data; 
}


let columns = [
    { index: 0, title: '#', field: 'id', hozAlign: 'left', width: '30' }
    { index: 0, title: 'Slug', field: 'name', hozAlign: 'left', width: 150 },
    { index: 1, title: 'Destination', field: 'destination',hozAlign: 'left', width: 120 },
    { index: 2, title: 'Country', field: 'country', hozAlign: 'left' },
    { index: 3, title: 'Location', field: 'location', hozAlign: 'left' , width: 150 },
    { index: 4, title: 'User Agent', field: 'coordinates',hozAlign: 'left'  },
    { index: 5, title: 'HTTP Protocol', field: 'ipAddress', hozAlign: 'left' },
    { index: 6, title: 'IP Address', field: 'host', hozAlign: 'left' , width: 120 },
    { index: 7, title: 'Host', field: 'tlsVersion', hozAlign: 'left'  },
    { index: 8, title: 'TLS Version', field: 'httpProtocol',hozAlign: 'left'  },
    { index: 9, title: 'Timestamp', field: 'timestamp', hozAlign: 'left' },
    { index: 10, title: 'ASN', field: 'asn',  hozAlign: 'left' },
    { index: 11, title: 'Views', field: 'views' },
];

  
const Tabultor:React.FC<ITabulatorProps> = ({ dataset }) => {
    let data = generateData(dataset);
    
    if(!dataset || !data?.length) return <TableSkeleton /> 
   
    return (
        <Box css={{ margin: '$1', padding: '$1', border: 'thin solid transparent', borderRadius: '5px', minHeight: '550px' }}>
            <Flex css={{ fd: 'column', jc: 'stretch', ai: 'stretch' }}>
                <ReactTabulator
                    data={data}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                />
            </Flex>
        </Box>
    );
}

export default Tabultor