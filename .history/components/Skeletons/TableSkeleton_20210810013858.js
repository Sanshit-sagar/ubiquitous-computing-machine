import React from 'react'

import { Box } from '../../primitives/Box'
import ContentLoader from 'react-content-loader'

const TableSkeleton = (props) => {
    return (
        <Box css={{ height: '600px', paddingTop: '$5' }}>
            <ContentLoader
                width={1300}
                height={600}
                viewBox="0 0 1300 600"
                backgroundColor="transparent"
                foregroundColor="red"
                {...props}
            >
                <rect x="100" y="33" rx="0" ry="0" width="100" height="30" />
            </ContentLoader>    
        </Box>
    );
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
