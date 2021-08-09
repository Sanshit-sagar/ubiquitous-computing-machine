// import React from 'react'

// import { Box } from '../../primitives/Box'
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
import React from 'react'
import ContentLoader from 'react-content-loader'

const TableSkeleton = (props) => {
    return (
        <ContentLoader
            width={1250}
            height={600}
            viewBox="0 0 1250 600"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
            {...props}
        >
            <rect x="51" y="45" rx="3" ry="3" width="1240" height="20" />
            <circle cx="879" cy="123" r="11" />
            <circle cx="914" cy="123" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <circle cx="880" cy="184" r="11" />
            <circle cx="915" cy="184" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <circle cx="881" cy="242" r="11" />
            <circle cx="916" cy="242" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <circle cx="882" cy="303" r="11" />
            <circle cx="917" cy="303" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <circle cx="881" cy="363" r="11" />
            <circle cx="916" cy="363" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <circle cx="882" cy="424" r="11" />
            <circle cx="917" cy="424" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <rect x="51" y="49" rx="3" ry="3" width="2" height="545" />
            <rect x="955" y="49" rx="3" ry="3" width="2" height="545" />
            <circle cx="882" cy="484" r="11" />
            <circle cx="917" cy="484" r="11" />
            <rect x="104" y="115" rx="3" ry="3" width="160" height="15" />
            <rect x="305" y="114" rx="3" ry="3" width="360" height="15" />
            <rect x="661" y="114" rx="3" ry="3" width="190" height="15" />
            <rect x="55" y="155" rx="3" ry="3" width="1150" height="2" />
            <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
            <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
            <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
            <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
            <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
            <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
        </ContentLoader>
    );
}


export default TableSkeleton