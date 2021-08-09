import React, { useEffect, useContext } from 'react'

import { Tab, Tabs, Button } from "@blueprintjs/core";

import { ScatterPlot, LineChart, BarChart } from './index'

import { Flex } from '../../primitives/Flex'
import { GraphStore } from '../../store';


const GraphToolbar = () => {
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
                <BarChart  />
              } 
            />
            
            
            <Tab id="line" title={<Button text="Total Visits" icon="chart" minimal={true}/>} 
              panel={
                <LineChart />
              } 
            />
            
            <Tab 
              id="scatter" 
              title={<Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>} 
              panel={ <ScatterPlot />}
            />
            <Tabs.Expander />
        </Tabs> 
      </Flex>
    );
}

export default GraphToolbar 