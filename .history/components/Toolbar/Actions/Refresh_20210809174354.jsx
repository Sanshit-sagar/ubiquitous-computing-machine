import React, { useContext } from 'react';

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { AccessibleIcon } from '../../../primitives/AccessibleIcon'
import { ToggleGroup, ActionButtonItem } from '../../../primitives/ToggleGroup'

import { ReloadIcon, CursorArrowIcon, Link2Icon } from '@radix-ui/react-icons'
import { NewSlugStore } from '../../../store'
import toast from 'react-hot-toast'

const RefreshTable = () => {

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
                        <ReloadIcon />
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

                    {/* <Text> Clicks </Text> */}
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