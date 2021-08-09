import React from 'react'

import { Box } from '../../primitives/Box'
import ContentLoader from 'react-content-loader'

const TableSkeleton = (props) => {
    return (
        <Box css={{ height: '420', paddingTop: '$5' }}>
            <ContentLoader
                width={1270}
                height={450}
                viewBox="0 0 1400 450"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <circle cx="1456" cy="203" r="12" />
                <rect x="27" y="25" rx="4" ry="4" width="20" height="20" />
                <rect x="67" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="188" y="25" rx="10" ry="10" width="169" height="19" />
                <rect x="402" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="523" y="25" rx="10" ry="10" width="169" height="19" />
                <rect x="731" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="852" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="1424" y="25" rx="10" ry="10" width="68" height="19" />
                <rect x="26" y="25" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="25" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="25" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="25" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="25" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="203" r="12" />
                <rect x="851" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="27" y="80" rx="4" ry="4" width="20" height="20" />
                <rect x="67" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="188" y="80" rx="10" ry="10" width="169" height="19" />
                <rect x="402" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="523" y="80" rx="10" ry="10" width="169" height="19" />
                <rect x="731" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="852" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="1424" y="80" rx="10" ry="10" width="68" height="19" />
                <rect x="26" y="80" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="80" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="80" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="80" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="80" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="203" r="12" />
                <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
                <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
                <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
                <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
                <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
                <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
                <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />
                <rect x="1424" y="137" rx="10" ry="10" width="68" height="19" />
                <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="203" r="12" />
                <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="265" r="12" />
                <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="323" r="12" />
                <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />
                <circle cx="1456" cy="386" r="12" />
                <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />
                <rect x="1183" y="139" rx="10" ry="10" width="85" height="19" />
                <rect x="1182" y="196" rx="10" ry="10" width="85" height="19" />
                <rect x="1182" y="258" rx="10" ry="10" width="85" height="19" />
                <rect x="1182" y="316" rx="10" ry="10" width="85" height="19" />
                <rect x="1182" y="379" rx="10" ry="10" width="85" height="19" />
                <rect x="1305" y="137" rx="10" ry="10" width="85" height="19" />
                <rect x="1304" y="194" rx="10" ry="10" width="85" height="19" />
                <rect x="1304" y="256" rx="10" ry="10" width="85" height="19" />
                <rect x="1304" y="314" rx="10" ry="10" width="85" height="19" />
                <rect x="1304" y="377" rx="10" ry="10" width="85" height="19" />
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
