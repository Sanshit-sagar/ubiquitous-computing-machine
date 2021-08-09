import React, { useContext } from 'react'

import {
  BarChartIcon, 
  SliderIcon,
  CalendarIcon
} from '@radix-ui/react-icons'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { GraphStore } from '../../store'
import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'

import toast from 'react-hot-toast'

const ToolbarMenu = ({ selected, handleSelectionChange }) => {
  const state = useContext(GraphStore.State)
  const dispatch = useContext(GraphStore.Dispatch)

  const items = [
    { id: 'bar', content: 'Bar Chart', label: 'frequency', icon: <BarChartIcon />},
    { id: 'line', content: 'Line Chart', label: 'cummulativeFrequency', icon: <SliderIcon />},
    { id: 'scatter', content: 'Scatter Plot', label: 'scatterPlot', icon: <CalendarIcon />},
  ]

  return (
      <Box css={{ width: '100%',  py: '$1', px: '$2', height: '50px', bc: '#fff', color: 'transparent', borderBottom: 'thin solid silver', br: '5px' }}>
          <p> {state.selectedTabId} </p>
          <Flex css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'stretch', gap: '$1' }}>
            {items.map(function(value, index) {
              return (
                <AccessibleStyledButton
                  key={index}
                  id={value.id}
                  icon={value.icon}
                  content={value.content}
                  label={value.label}
                  selected={selected}
                  handleClick={(e) => {
                    toast.success(`Changing tabs to ${value.id}`)
                    dispatch({
                      type: 'select',
                      payload: {
                          key: 'selectedTabId',
                          value: value.id,
                      }
                    });
                  }}
                />
              );
            })}
          </Flex>
      </Box>
  )
}


const GraphToolbar = ({ loading }) => {
    const state = useContext(GraphStore.State)
    // const dispatch = useContext(GraphStore.Dispatch)

    // const handleSelectionChange = (e, selectedTabId) => {
    //   dispatch({
    //     type: 'select',
    //     payload: {
    //         key: 'selectedTabId',
    //         value: selectedTabId
    //     }
    //   });
    // }

    return (
        <Box css={{ border: 'thin solid transparent' }}>
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
          
              <ToolbarMenu 
                selected={state.selectedTabId} 
              />
            
           </Flex>
        </Box>
    );
}

export default GraphToolbar 

