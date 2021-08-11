import React, { useContext } from 'react';
import { useRouter } from 'next/router'

import { Flex } from '../../../primitives/Flex'
import { AccessibleIcon } from '../../../primitives/AccessibleIcon'
import { ToggleGroup, ActionButtonItem } from '../../../primitives/ToggleGroup'

import { ReloadIcon, CursorArrowIcon, Link2Icon } from '@radix-ui/react-icons'
import { NewSlugStore } from '../../../store'
import { LoadingSpinner } from '../../Loader'

import toast from 'react-hot-toast'

const RefreshTable = ({ loading }) => {
    const router = useRouter()
    let path = router.pathname.split('/')
    let currentPath = path[path.length - 1];
    const [value, setValue]= React.useState(currentPath)

    const refreshData = () => {
        router.replace(`/tables/${router.pathname}`)
    }

    const handleChange = (updatedValue) => {
        setValue(updatedValue)
    }

    const handleNavigation = (updatedPath) => {
        // let updatedPath = e.target.value
        if(value!==updatedPath) {
            router.push(`/tables/${updatedPath}`)
        } else {
            toast.error(`Already here`)
        }
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
                <ActionButtonItem value="clicks" onClick={() => handleNavigation('clicks')}>
                    <AccessibleIcon label={'View Clickstream'}>
                        <CursorArrowIcon />
                    </AccessibleIcon>

                </ActionButtonItem>
                <ActionButtonItem value="links" onClick={() => handleNavigation('links')}>
                    <AccessibleIcon label={'View All Links'}>
                        <Link2Icon />
                    </AccessibleIcon>
                </ActionButtonItem>
            </ToggleGroup>
        </Flex>
    )
}

export default RefreshTable