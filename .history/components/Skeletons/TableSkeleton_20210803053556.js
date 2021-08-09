import React from 'react'
import Loader from '../Loader'


const RowSkeleton = () => {
    let emptyRow = [125,125,125,125,125,125,125,125,125,40];

    return (
        <td>
            <Box css={{ border: 'thin solid silver' }}>
                <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
                        {emptyRow.map(function (value, index) {
                            return (
                                <Box 
                                    key={index} 
                                    css={{ width: `${value}px`, height: '30px', ml: '$2', mt: '$2' }}
                                >
                                    <Loader /> 
                                </Box>
                            );
                        })}
                </Flex>
            </Box>
       </td>
    )
}


const TableSkeleton = () => {
    let emptyTableRows = [1,2,3,4,5,6,7,8,9,10];

    return (
        <tbody>
            <Box css={{ border: 'thin solid silver' }}>
                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        {emptyTableRows.map(function (value, index) {
                            return (
                                <tr>
                                    <RowSkeleton /> 
                                </tr>
                            );
                        })}
                </Flex>
            </Box>
         </tbody>
    )
}

export default TableSkeleton