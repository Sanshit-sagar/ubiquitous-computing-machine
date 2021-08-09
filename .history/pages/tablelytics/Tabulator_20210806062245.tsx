import React, { useRef } from 'react'

import 'react-tabulator/lib/styles.css'
import 'react-tabulator/lib/css/tabulator.min.css'
import { ReactTabulator } from 'react-tabulator'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient(); 

interface ITabulatorProps {
    dataset: string;
}

const userEmail = Prisma.validator<Prisma.UserSelect>()({
    email: true,
})

// const columns = [
//   { title: "Name", field: "name", width: 150,  headerFilter: "input" },
//   { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
//   { title: "Favourite Color", field: "col" },
//   { title: "Date Of Birth", field: "dob", hozAlign: "center" },
//   { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
//   { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
// ];

var data = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];

function generateData(clicks) {
    let data = [];
    
    clicks.map(function(value, index) {
        data.push({
            id: index + 1,
            name: `${value.slug}`,
            destination: `${value.destination}`,
            country: `${value.country}`,
            location: `${value.city}, ${value.postalCode}`,
            coordinates: `${value.longitude}, ${value.latitude}`,
            ipAddress: `${value.ip}`,
            host: `${value.host}`,
            tlsVersion: `${value.tlsVersion}`,
            httpProtocol: `${value.httpProtocol}`,
            timestamp: `${value.timestamp}`,
            asn: `${value.asn || '-'}`,
            views: `nnnn`,
        });
    });

    return data; 
}



let columns = [
    { row: 0, name: 'Slug', accessor: 'name', component: 'StyledCell', long: true },
    { row: 1, name: 'Destination', accessor: 'destination', component: 'StyledCell',  long: false },
    { row: 2, name: 'Country', accessor: 'country', component: 'CountryCell', long: false },
    { row: 3, name: 'Location', accessor: 'location', component: 'GeodataCell',  long: true },
    { row: 4, name: 'User Agent', accessor: 'coordinates', component: 'UserAgentCell', long: true },
    { row: 5, name: 'HTTP Protocol', accessor: 'ipAddress', component: 'StyledCell', long: false },
    { row: 6, name: 'IP Address', accessor: 'host', component: 'StyledCell', long: false },
    { row: 7, name: 'Host', accessor: 'tlsVersion',component: 'StyledCell',  long: false },
    { row: 8, name: 'TLS Version', accessor: 'httpProtocol', component: 'StyledCell', long: true },
    { row: 9, name: 'Timestamp', accessor: 'timestamp', component: 'TimestampCell', long: false },
    { row: 10, name: 'ASN', accessor: 'asn', component: 'StyledCell', long: true },
    { row: 11, name: 'Views', accessor: 'views', component: 'ViewsCell', long: true },
];

  
const Tabultor:React.FC<ITabulatorProps> = ({ dataset }) => {
   
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