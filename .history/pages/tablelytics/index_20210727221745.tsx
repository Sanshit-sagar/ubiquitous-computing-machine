import React from 'react'

import StackedLayout from '../../sections/StackedLayout'
import SortedStatModal from '../../components/SortedStatModal'


import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Heading } from '../../primitives/Heading'
import StyledSeparator from '../../primitives/Separator'

interface IMetadataProps {
    title: string;
    description: string; 
}

interface ITablelyticsProps {
    metadata: IMetadataProps;
}

const TabulatedData:React.FC<any> = () => {
    return (
       
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {
    
    return (
        <StackedLayout pageMeta={metadata}>
             <Card interactive={true} ghost active={true}>
                <Heading size='$1'> Tablelytics </Heading>
                
                <Box css={{ my: '$2' }}>
                    <StyledSeparator />
                </Box>
            </Card>
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
  