import React, { useState, useContext } from 'react'
import { Tab, Tabs, Button, Classes, Spinner } from "@blueprintjs/core";
import { NewSlugStore, GlobalStore } from '../../store';
import { DateRangePicker } from '@blueprintjs/datetime'
import { Popover2 } from '@blueprintjs/popover2'

const TimeRangeSelector = ({ handleDateChange }) => {
  const state = useContext(GlobalStore.State)
  
  return (
    <DateRangePicker
        className={`${Classes.ELEVATION_1} ${state.darkMode ? 'bp3-dark' : ''}`}
        // maxDate={maxDate}
        // minDate={minDate}
        onChange={handleDateChange}
    />
  )
}

const OptionsBar = ({ bar, line, scatter, stacked, toggleFill }) => {
    const uiState = useContext(GlobalStore.State)
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    const [isOpen, setIsOpen] = useState(false)

    const [selected, setSelected] = useState('bar');
    const [dateRange, setDateRange] = useState([null, null]);

    const handleDateChange = (updatedDateRange) => {
      setDateRange(updatedDateRange);
    }

    const togglePopover = () => {
      setIsOpen(!isOpen)
    }

    const handleSelectionChange = (tabId) => {
      if(tabId !== 'action') {
        setSelected(tabId)
      }
    }

    const handleTimeSelection = () => {
      setIsOpen(!isOpen); 
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
        <Tabs 
          id="graphTypeSelector" 
          onChange={handleSelectionChange} 
          selectedTabId={selected}
        >
          <Tab id="bar" title={<Button text="Page Visits" icon="timeline-bar-chart" minimal={true}/>} panel={bar} />
          <Tab id="line" title={<Button text="Total Visits" icon="chart" minimal={true}/>} panel={line} />
          <Tab id="scatter" title={<Button text="24/7 Scatterplot" icon="scatter-plot" minimal={true}/>} panel={scatter} />
          <Tab id="stacked" title={<Button text="Stacked" icon="stacked-chart" minimal={true}/>} panel={stacked} /> 
          <Tabs.Expander />
          
          <Tab id="action" 
            title={
              <Popover2
                interactionKind="click-target"
                placement="auto"
                isOpen={isOpen}
                onClick={handleTimeSelection}
                usePortal={true} 
                content={
                    <div>
                        <TimeRangeSelector /> 
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Button 
                            className={Classes.POPOVER2_DISMISS} 
                            text="Done"
                            onClick={togglePopover}
                          />
                        </div>
                    </div>
                }
              >
                <Button 
                  icon="calendar"
                  text="Select Time Period" 
                  large={false}
                  outlined={true} 
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Popover2> 
            } 
            panel={null} 
          /> 
        </Tabs>   
      </div>

    );
}

export default OptionsBar 