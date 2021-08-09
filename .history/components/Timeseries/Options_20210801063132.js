import React, { useState, useContext } from 'react'
import { Tab, Tabs, Button } from "@blueprintjs/core";
import { GraphStore } from '../../store';

import { Flex } from '../../primitives/Flex'


const OptionsBar = ({ bar, line, scatter }) => {

    // const [selected, setSelected] = useState('bar');

    // const handleSelectionChange = (tabId) => {
    //   if(tabId !== 'action') {
    //     setSelected(tabId)
    //   }
    // }
    const state = useContext(GraphStore.State)
    const dispatch = useContext(GraphStore.Dispatch)

    const handleSelectionChange = (tabId) => {
      dispatch({
        type: 'toggle',
        payload: {
          key: `selectedTab`,
        }
      })
    }

    return (
      <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
        
        <Tabs 
          id="GraphDataFilter" 
          onChange={handleSelectionChange} 
          selectedTabId={state.selectedTab}
        >
          <Tab id="bar" title={<Button text="Page Visits" icon="timeline-bar-chart" minimal={true}/>} panel={bar} />
          <Tab id="line" title={<Button text="Total Visits" icon="chart" minimal={true}/>} panel={line} />
          <Tab id="scatter" title={<Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>} panel={scatter} />
          <Tabs.Expander />
        </Tabs> 

      </Flex>

    );
}

export default OptionsBar 