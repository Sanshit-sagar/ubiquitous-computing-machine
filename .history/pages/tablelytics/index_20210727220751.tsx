import React from 'react'

import StackedLayout from '../../sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

import useSWR from 'swr'

const TabulatedData = () => {
    return (
        <SortedStatModal filter="allViews"/>
    );
}

const TablelyticsWrapper = ({ metadata }) => {
    
    return (
        <StackedLayout pageMeta={metadata}>
            <TabulatedData />
        </StackedLayout>
    );
}

export default TablelyticsWrapper

TablelyticsWrapper.defaultProps = {
    metadata: { 
        title: 'Tablelytics', 
        description: 'Testing tables'
    }
}
  