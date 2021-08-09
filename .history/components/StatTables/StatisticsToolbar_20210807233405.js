

import React, { useContext } from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { BarChartIcon, PieChartIcon } from '@radix-ui/react-icons'

import ToggleButton from '../../primitives/Toggle'

import { NewSlugStore } from '../../store'
import Toolbar from '../../primitives/Toolbar'

const ChartTypeSelector = () => {
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
        <Box>
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
        </Box>
    )
}


const StatisticsToolar = ({ data, email }) => {
    const state = useContext(NewSlugStore.State)
   
    return (
       <Toolbar 
            rightElement={<ChartTypeSelector/>} 
        />
    )
}

export default StatisticsToolar