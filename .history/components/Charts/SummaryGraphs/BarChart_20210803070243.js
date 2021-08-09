import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

const ChartTitle = () => {

    return (
        <Text> 
            {`${type==='bar' ? 'Bar' : 'Pie'} Chart: ${title}`} 
        </Text> 
    )
}


const PieChart = ({ sortedData, title,  type}) => {

    return (
        <Box css={{ border: 'thin solid black', width: '500px', height: '400px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}>
                <ChartTitle type={type} title={title} />

                <Box css={{ border: 'thin solid black', br: '$2', margin: '$2' }}> 
                    {type=='bar' 
                    ? <PieChart data={sortedData} /> 
                    : <BarChart data={sortedData} />
                }</Box>
            </Flex>
        </Box> 
    );
}

export default PieChart