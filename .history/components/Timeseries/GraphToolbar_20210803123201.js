import React, { useContext } from 'react'

import { Tab, Tabs, Button } from "@blueprintjs/core";

import { ScatterPlot, LineChart, BarChart } from './index'
import { GraphSkeleton } from './index'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { GraphStore } from '../../store';

const ToolbarMenu = () => {

  return (
      <Box css={{ py: '$1', px: '$2', height: '50px', bc: '#fff', color: '#000', border: 'thin solid white', br: '5px' }}>
          <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
            <Button text="Page Visits" icon="timeline-bar-chart" minimal={true}/>
            <Button text="Total Visits" icon="chart" minimal={true}/>
            <Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>
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
{/* <Tabs 
          id="GraphDataFilter" 
          onChange={handleSelectionChange} 
          selectedTabId={state.selectedTab}
        ></Tabs> */}

    return (
        <Box css={{ border: 'thin solid transparent' }}>
          <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
          
              <Toolbar />
            
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