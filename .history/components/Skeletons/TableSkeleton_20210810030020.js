import React from 'react'

import { Box } from '../../primitives/Box'
// import ContentLoader from 'react-content-loader'
import Loader from '../Loader'
import Skeleton from 'react-loading-skeleton';

import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader
  } from '@react-stately/table';
import Table from '../Table/Navigatable/Table';

// const CellSkeleton = ({ x, y }) => {
//     return (
//         <Box css={{ height: '30px', width: '80px' }}>
//             <ContentLoader
//                 width={100}
//                 height={30}
//                 viewBox={`${x} ${y} ${x+100} ${y+30}`}
//                 backgroundColor="transparent"
//                 foregroundColor="white"
//             >
//                 <rect x={x} y={y} rx="0" ry="0" width="100" height="30" />
//             </ContentLoader>    
//         </Box>
//     );
// }

const TableSkeleton = () => {
    let rows = [...new Array(15)].map(() => 0);
    let cols = [...new Array(15)].map(() => 0);

    return (
        <Table>
            <TableHeader>
                {rows.map(function(value, h) {
                    return (
                        <Column key={h}> 
                            Loading... 
                        </Column>
                    );
                })}
            </TableHeader>
            <TableBody>
                {rows.map(function(value, i) {
                    return (
                        <Row key={i}>
                            {cols.map(function (value, j) {
                                return (
                                    <Cell key={j}>
                                        <Loader />
                                    </Cell>
                                )
                            })}
                        </Row>
                    );
                })}
            </TableBody>
        </Table> 
    )
}


export default TableSkeleton

// import React from 'react'

// import { Flex } from '../../primitives/Flex'
// import Loader from '../Loader'

// const RowSkeleton = () => {
//     let emptyRow = [125,125,125,125,125,125,125,125,125,40];

//     return (
//         <td>
//             <Box css={{ border: 'thin solid silver' }}>
//                 <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
//                         {emptyRow.map(function (value, index) {
//                             return (
//                                 <Box 
//                                     key={index} 
//                                     css={{ width: `${value}px`, height: '30px', ml: '$2', mt: '$2' }}
//                                 >
//                                     <Loader /> 
//                                 </Box>
//                             );
//                         })}
//                 </Flex>
//             </Box>
//        </td>
//     )
// }


// const TableSkeleton = () => {
//     let emptyTableRows = [1,2,3,4,5,6,7,8,9,10];

//     return (
//         <tbody>
//             <Box css={{ border: 'thin solid silver' }}>
//                 <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
//                         {emptyTableRows.map(function (value, index) {
//                             return (
//                                 <tr>
//                                     <RowSkeleton /> 
//                                 </tr>
//                             );
//                         })}
//                 </Flex>
//             </Box>
//          </tbody>
//     )
// }
