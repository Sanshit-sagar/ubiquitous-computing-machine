import React, { useState, useContext } from 'react'
import { Tab, Tabs, Button } from "@blueprintjs/core";
import { NewSlugStore, GlobalStore } from '../../store';

import { Flex } from '../../primitives/Flex'
// import { DateRangePicker } from '@blueprintjs/datetime'

// const TimeRangeSelector = ({ handleDateChange }) => {
//   const state = useContext(GlobalStore.State)
  
//   return (
//     <DateRangePicker
//         className={`${Classes.ELEVATION_1} ${state.darkMode ? 'bp3-dark' : ''}`}
//         // maxDate={maxDate}
//         // minDate={minDate}
//         onChange={handleDateChange}
//     />
//   )
// }


const OptionsBar = ({ bar, line, scatter }) => {

    const [selected, setSelected] = useState('bar');

    const handleSelectionChange = (tabId) => {
      if(tabId !== 'action') {
        setSelected(tabId)
      }
    }

    return (
      <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
        
        <Tabs 
          id="GraphDataFilter" 
          onChange={handleSelectionChange} 
          selectedTabId={selected}
        >
          <Tab id="bar" title={<Button text="Page Visits" icon="timeline-bar-chart" minimal={true}/>} panel={bar} />
          <Tab id="line" title={<Button text="Total Visits" icon="chart" minimal={true}/>} panel={line} />
          <Tab id="scatter" title={<Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>} panel={scatter} />
          <Tab id="stacked" title={<Button text="Stacked" icon="stacked-chart" minimal={true}/>} panel={stacked} /> 
          <Tabs.Expander />
        </Tabs> 

      </Flex>

    );
}

export default OptionsBar 