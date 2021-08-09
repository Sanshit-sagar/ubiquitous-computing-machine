import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import Loader from '../../Loader'

const ChartTitle = ({ type, title, variable, loading }) => {

    return (
        <Text> 
            {`${type==='bar' ? 'Bar' : 'Pie'} Chart: ${title}`} 
        </Text> 
    )
}

const PieChart = ({ data }) => {
    return (
        <Text> {JSON.stringify(data)} </Text>
    )
}


const BarChart = ({ data }) => {
    return (
        <Text> {JSON.stringify(data)} </Text>
    )
}


const DataChart = ({ sortedData, title,  variable, type, loading }) => {

    return (
        <Box css={{ border: 'thin solid black', width: '500px', height: '400px', overflowY: 'hidden', overflowX: 'hidden' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2' }}>
                <ChartTitle type={type} title={title} variable={variable} loading={loading} />
                <>
                    <Box css={{ border: 'thin solid black', br: '$2', margin: '$2' }}> 
                        {type=='bar' 
                        ? <PieChart data={sortedData} /> 
                        : <BarChart data={sortedData} />}
                    </Box>
                </>
            </Flex>
        </Box> 
    );
}



export default DataChart