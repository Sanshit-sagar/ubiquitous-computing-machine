import React, { useContext } from 'react'


// import { ScatterPlot, LineChart, BarChart } from './index'
// import { GraphSkeleton } from './index'
import {
  BarChartIcon, 
  SliderIcon,
  CalendarIcon
} from '@radix-ui/react-icons'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'
import { GraphStore } from '../../store';

const ToolbarMenu = ({ selected, handleSelectionChange }) => {

  const items = [
    { id: 'bar', content: 'Bar Chart', label: 'frequency', icon: <BarChartIcon />},
    { id: 'line', content: 'Line Chart', label: 'cummulativeFrequency', icon: <SliderIcon />},
    { id: 'scatter', content: 'Scatter Plot', label: 'scatterPlot', icon: <CalendarIcon />},
  ]

  return (
      <Box css={{ width: '100%',  py: '$1', px: '$2', height: '50px', bc: 'silver', color: '#fff', border: 'thin solid white', br: '5px' }}>
          <Flex css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'stretch', gap: '$1' }}>
            {items.map(function(value, index) {
              return (
                <AccessibleStyledButton
                  key={index}
                  id={value.id}
                  icon={value.icon}
                  content={value.content}
                  label={value.label}
                />
              );
            })}
          </Flex>
      </Box>
  )
}


const GraphToolbar = ({ loading }) => {
    const state = useContext(GraphStore.State)
    const dispatch = useContext(GraphStore.Dispatch)

    const handleSelectionChange = (selectedTabId) => {
      dispatch({
        type: 'select',
        payload: {
            key: 'selectedTabId',
            value: selectedTabId
        }
      });
    }

    return (
        <Box css={{ border: 'thin solid transparent' }}>
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
          
              <ToolbarMenu 
                selected={state.selectedTab} 
                handleSelectionChange={handleSelectionChange} 
              />
            
           </Flex>
        </Box>
    );
}

export default GraphToolbar 



 {/* <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
        
          <Tab 
            id="bar" 
            title={<Button text="Page Visits" icon="timeline-bar-chart" minimal={true}/>} 
            panel={
              loading ? <GraphSkeleton /> : <BarChart  />
            } 
          />
          
          
          <Tab 
            id="line" 
            title={<Button text="Total Visits" icon="chart" minimal={true}/>} 
            panel={
              loading ? <GraphSkeleton /> : <LineChart />
            } 
          />
          
          <Tab 
            id="scatter" 
            title={<Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>} 
            panel={ 
              loading ? <GraphSkeleton /> : <ScatterPlot />
            }
          />
          <Tabs.Expander />
      </Tabs> 
    </Flex> */}