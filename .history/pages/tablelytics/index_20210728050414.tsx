import React from 'react'

import StackedLayout from '../../sections/StackedLayout'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'
import { Heading } from '../../primitives/Heading'
import StyledSeparator from '../../primitives/Separator'

import Tabulator from './Tabulator'

interface IMetadataProps {
    title: string;
    description: string; 
}

interface ITablelyticsProps {
    metadata: IMetadataProps;
}

const TabulatedData:React.FC<any> = () => {
    let datasetName:string = 'Clickstream'

    return (
        <Tabulator dataset={datasetName} /> 
    );
}

const TablelyticsWrapper:React.FC<ITablelyticsProps> = ({ metadata }) => {
    
    return (
        <StackedLayout pageMeta={metadata}>
            <Card>
                <Heading size='1'> Tablelytics </Heading>
                
                <Box css={{ my: '$2' }}>
                    <StyledSeparator />
                </Box>

                <TabulatedData /> 
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
  