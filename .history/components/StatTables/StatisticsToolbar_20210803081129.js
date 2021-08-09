

import React, { useState, useEffect, useContext } from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { BarChartIcon, PieChartIcon } from '@radix-ui/react-icons'

import ToggleButton from '../../primitives/Toggle'

import { NewSlugStore } from '../../store'

import Toolbar from '../../primitives/Toolbar'


const StatisticsToolar = ({ data, email }) => {
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
        <Box css={{ py: '$1', px: '$2', height: '50px', bc: 'silver', color: '#000', border: 'thin solid white', br: '5px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
                {/* <Box>
                    <Text> {JSON.stringify(data)} </Text>
                </Box> */}
                <Toolbar />

                {/* <Box>
                    <Flex css={{ fd: 'row', jc: 'row', ai: 'stretch', gap: '$1' }}>
                        
                        <ToggleButton 
                            isPressed={state.activeChart==='pie'}
                            handlePress={() => handleGraphTypeUpdate('pie')}
                            pressedElem={<PieChartIcon />} 
                            unpressedElem={<PieChartIcon />} 
                        />

                        <ToggleButton 
                            isPressed={state.activeChart==='bar'}
                            handlePress={() => handleGraphTypeUpdate('bar')}
                            pressedElem={<BarChartIcon />} 
                            unpressedElem={<BarChartIcon />} 
                        />

                    </Flex>
                </Box> */}

            </Flex>
        </Box>
    )
}

export default StatisticsToolar