

import React, { useState, useEffect, useContext } from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { BarChartIcon, PieChartIcon } from '@radix-ui/react-icons'

import { NewSlugStore } from '../../store'


const StatisticsToolar = ({ email }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleGraphTypeUpdate = (updatedType) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'activeChart',
                value: updatedType
            }
        }); 
    }

    return (
        <Box style={{ width: '100%', margin: '0px 0px 20px 0px', padding: '2.5px' }}>
            <Flex css={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                
                <Box>
                    <Text> {email} </Text>
                </Box>

                <Box>
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
                </Box>

            </Flex>
        </Box>
    )
}

export default StatisticsToolar