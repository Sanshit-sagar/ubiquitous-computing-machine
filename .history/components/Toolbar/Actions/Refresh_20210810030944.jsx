import React, { useContext } from 'react';

import { Flex } from '../../../primitives/Flex'
import { AccessibleIcon } from '../../../primitives/AccessibleIcon'
import { ToggleGroup, ActionButtonItem } from '../../../primitives/ToggleGroup'

import { ReloadIcon, CursorArrowIcon, Link2Icon } from '@radix-ui/react-icons'
import { NewSlugStore } from '../../../store'
import { LoadingSpinner } from '../../Loader'

const RefreshTable = ({ loading }) => {

    const dispatch = useContext(NewSlugStore.Dispatch)

    const [value, setValue]= React.useState('clicks')

    const refreshData = () => {
        dispatch({
            type: 'toggle',
            payload: {
                key: 'doRefresh',
            }
        })
    }

    const handleChange = (updatedValue) => {
        setValue(updatedValue)
    }

    return (
        <Flex css={{ fd: 'row', jc: 'flex-start', align: 'center', gap: '$2' }}>
            <ToggleGroup 
                type="single" 
                defaultValue={false} 
                aria-label="Reload Data"
            >
                <ActionButtonItem onClick={refreshData}>
                    <AccessibleIcon label={'Refresh table'}>
                        {loading ? <LoadingSpinner /> : <ReloadIcon />}
                    </AccessibleIcon>
                </ActionButtonItem>
            </ToggleGroup>

            <ToggleGroup
                type="single"
                value={value} 
                onValueChange={(value) => handleChange(value)} 
                orientation="horizontal"
                rovingFocus={true}
                loop={true}
                aria-label="Reload Data"
            >
                <ActionButtonItem value="clicks">
                    <AccessibleIcon label={'View Clickstream'}>
                        <CursorArrowIcon />
                    </AccessibleIcon>

                </ActionButtonItem>
                <ActionButtonItem value="links">
                    <AccessibleIcon label={'View All Links'}>
                        <Link2Icon />
                    </AccessibleIcon>
                    
                    {/* <Text> Links </Text> */}
                </ActionButtonItem>
            </ToggleGroup>
        </Flex>
    )
}

export default RefreshTable