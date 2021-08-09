import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'


const PieChart = ({ sortedData, title }) => {

    return (
        <Box css={{ border: 'thin solid black', maxWidth: '100px', maxHeight: '350px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}>
                <Text> {`Bar Chart: ${title}`} </Text> 
                <Text> {JSON.stringify(sortedData)} </Text>
            </Flex>
        </Box> 
    );
}

export default PieChart