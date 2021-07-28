import React from 'react'

import StackedLayout from '../../sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

import { Card } from '../../primitives/Card'

import useSWR from 'swr'

const TabulatedData = () => {
    return (
        <Card interactive={true} ghost active={true}>
            <SortedStatModal filter="allViews"/>
        </Card>
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
  