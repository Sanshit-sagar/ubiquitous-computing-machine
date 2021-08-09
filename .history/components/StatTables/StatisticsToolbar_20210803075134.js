

import React, { useState, useEffect } from 'react'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'


const StatisticsToolar = ({ email }) => {

    return (
        <div style={{ width: '100%', marginHorizontal: '12.5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', margin: '0px 0px 20px 0px', padding: '2.5px' }}>
            
            {/* <div>
                <ActiveDatasetSelector email={email} /> 
            </div> */}
            <Box>
                <Text> {email} </Text>
            </Box>

            <div>
                <Button
                    size="medium"
                    type="outline"
                    icon="pie-chart"
                    onClick={() => {handleGraphTypeUpdate('pie')}}
                    style={{ margin: '0px 5px 0px 5px' }}
                />
                <Button
                    size="medium"
                    type="outline"
                    icon="horizontal-bar-chart"
                    onClick={() => {handleGraphTypeUpdate('bar')}}
                    style={{ margin: '0px 5px 0px 5px' }}
                /> 
            </div>
        </div>
    )
}

export default StatisticsToolar