

import React, { useState, useEffect } from 'react'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { BarChartIcon, PieChartIcon } from '@radix-ui/react-icons'


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
                <Button onClick={() => {handleGraphTypeUpdate('pie')}}>
                    <AccessibleIcon label={'Pie Chart'}>
                        <PieChartIcon />
                    </AccessibleIcon>
                </Button>

                <Button onClick={() => {handleGraphTypeUpdate('bar')}}>
                    <AccessibleIcon label={'Bar Chart'}>
                        <BarChartIcon />
                    </AccessibleIcon>
                </Button>
            </div>
        </div>
    )
}

export default StatisticsToolar