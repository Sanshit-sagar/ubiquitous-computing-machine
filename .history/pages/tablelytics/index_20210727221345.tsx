import React from 'react'

import StackedLayout from '../../sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'

import { Card } from '../../primitives/Card'
import { Heading } from '../../primitives/Heading'
import StyledSeparator from '../../primitives/Separator'

import useSWR from 'swr'

const TabulatedData = () => {
    return (
        <Card interactive={true} ghost active={true}>
            <Heading size='$1'> Tablelytics </Heading>
            
            <Box css={{ my: '$2' }}>
                <StyledSeparator />
            </Box>
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
  