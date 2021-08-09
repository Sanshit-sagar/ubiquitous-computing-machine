import React, { useState, useContext } from 'react'
import { useSession } from 'next-auth/client'

import { Tab, Tabs, Button } from "@blueprintjs/core";

import { Flex } from '../../primitives/Flex'
import { GraphStore } from '../../store';

import toast from 'react-hot-toast'
import useSWR from 'swr'

const useViewsByFrequency = (email) => {
  const { data, error } = useSWR(email && email?.length ? `/api/graphs/frequency/${email}` : null);

  return {
      data: data ? data : {},
      loading: !data && !error,
      error: error
  };
}

const OptionsBar = ({ bar, line, scatter }) => {
    const [session, sessionLoading] = useSession();
    const state = useContext(GraphStore.State)
    const dispatch = useContext(GraphStore.Dispatch)

    const handleSelectionChange = (selectedTabId) => {
      // toast.success(`Changing tabs to tab with id: ${selectedTabId}`)

      dispatch({
        type: 'select',
        payload: {
            key: 'selectedTabId',
            value: selectedTabId
        }
      });
    }

    const updateDataArray = (updatedArray, dataset) => {
      toast.success(`Updating data for ${dataset}`)

      dispatch({
        type: 'update_array',
        payload: {
          key: 'dataset',
          value: updatedArray,
        }
      });
    }

    let email = session && session?.user ? session.user.email : ''
    const { data, loading, error } = useViewsByFrequency(email);

    useEffect(() => {
        if(!loading && !error && data?.length) {
            updateDataArray(data.freqsArr, 'freqsArr');
            updateDataArray(data.cummFreqArr, 'cummFreqArr');
            updateDataArray(data.scatterPlotArr, 'scatterPlotArr');
 
            let freqsLabels = [];
            data.freqsArr.forEach(function (value, index) {
                freqsLabels.push(`${value.x}`); 
            }); 

            updateDataArray(freqsLabels, 'freqsLabels');
            // dispatchIncrement('fetchCount');  
        }
    }, [loading, error, data]);

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