import React, { useContext } from 'react'

import { Tab, Tabs, Button } from "@blueprintjs/core";

import { ScatterPlot, LineChart, BarChart } from './index'
import { GraphSkeleton } from './index'

import { Flex } from '../../primitives/Flex'
import { GraphStore } from '../../store';


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
      <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
        <Tabs 
          id="GraphDataFilter" 
          onChange={handleSelectionChange} 
          selectedTabId={state.selectedTab}
        >
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
      </Flex>
    );
}

export default GraphToolbar 