
import React, { useState } from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { AccessibleIcon } from '../../../primitives/AccessibleIcon'
import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem, 
    SelectItemIndicator
} from '../../../primitives/Selectable'

import { DotFilledIcon, ChevronDownIcon } from '@radix-ui/react-icons'

import toast from 'react-hot-toast'


const PageSizeSelector = ({ loading, pageSize, setPageSize }) => {
    let items = [5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];
    const [open, setOpen] = useState(false);

    const updatePageSize = (updatedPageSize) => {
        if(updatedPageSize!==pageSize) {
            toast.success(`Changing page size to ${updatedPageSize}`)
            setPageSize(Number(updatedPageSize))
        }
    }

    return (
        <Box>
            <SelectRoot 
                sideOffset={5} 
                open={open} 
                onOpenChange={() => {setOpen(!open)}}
            >
                <SelectTrigger>
                    <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1' }}>
                        <Text size='3'> 
                            {`Showing ${loading ? '...' : pageSize}`}
                        </Text>
                        {!loading && 
                            <AccessibleIcon label={'Select Page Size'}>
                                <ChevronDownIcon /> 
                            </AccessibleIcon>
                        }
                    </Flex>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup 
                        value={pageSize}
                    >
                        {items.map((itemPageSize) => (
                            <SelectRadioItem  
                                key={itemPageSize} 
                                onSelect={() => updatePageSize(itemPageSize)}
                            >
                                <SelectItemIndicator>
                                    <DotFilledIcon />
                                </SelectItemIndicator>
                                <Text> 
                                    Show {itemPageSize} 
                                </Text>
                            </SelectRadioItem>
                    ))}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Box>
    )
}

export default PageSizeSelector