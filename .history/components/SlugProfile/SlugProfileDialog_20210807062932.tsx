import React from 'react'
import { IconButton } from '../../primitives/IconButton'
import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'


import { styled } from '@stitches/react';

import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogClose, 
    DialogTitle, 
    DialogDescription 
} from '../../primitives/Dialog'

import { ellipses } from '../../lib/utils'

import { Text } from '../../primitives/Text'

import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'
import StyledSeparator from '../../primitives/Separator'
import { SlugViews } from './SlugViews'

import useSWR from 'swr'
import toast from 'react-hot-toast'

import { CornersIcon, Cross2Icon, CheckIcon } from '@radix-ui/react-icons'

// const handleCopy = () => {
//     toast((t) => (
//         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
//                 Copied successfully! Try it out: 
//             <button onClick={() => toast.dismiss(t.id)}>
//                 Dismiss
//             </button>
//             </div>

//             <input 
//                 placeholder="Paste it here" 
//                 style={{ border: 'thin solid black', borderRadius: '5px', marginTop: '10px', padding: '2.5px' }} 
//             />
//         </div>
//     ));   
// }

// export const useSlugDetails = (slug) => {
//     const { data, error } =  useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);
//     console.log(data ? `got the data ${JSON.stringify(data)}` : 'no data');

//     return {
//         details: data ? data.details : null,
//         loading: !data && !error,
//         error
//     }; 
// }
const SlugProfileDetailsContainer = styled('div', {
    height: '100%',
    width: '100%',
    margin: '$2',
    padding: '$1',
    border: 'thin solid silver',
    borderRadius: '5px',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    alignItems: 'stretch',
    backgroundColor: mauve.mauve2,
    color: blackA.blackA12
});

const useSlugDetails = ({ slug }) => {
    const { data, error } = useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);
    console.log(data ? `got the data ${JSON.stringify(data)}` : 'no data');

    return {
        details: data ? data.details : null,
        loading: !data && !error,
        error
    };
}

const SlugProfileActions = () => {

    const handleCloseCleanup = () => {
        // toast.success(`Closing dialog...`);
    }

    return (
        <AccessibleStyledButton
            icon={<CheckIcon />}
            content={<Text> Save </Text>}
            label={'Close Modal Button'}
            handleClick={handleCloseCleanup}
        />
    )
}

const DialogTriggerButton = ({ name }) => {

    return (
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '10px', width: '200px' }}>
            <Text size='$1'>{ellipses(name, 20)}</Text>
            
            <DialogTrigger>
                <Button>
                    <CornersIcon />
                </Button>
            </DialogTrigger>
        </Flex>
    )
}

const SlugDetails = ({ slug }) => {
    const { details, loading, error } = useSlugDetails({ slug })

    if(loading) return <Loader />
    if(error) return <Text> Error! </Text>

    return (
        <SlugProfileDetailsContainer>
            <Text> {JSON.stringify(details)} </Text>
        </SlugProfileDetailsContainer>
    )
}


const SlugProfile = ({ name }) => {
    return (
        <Dialog>
            <DialogContent>
                <Flex css={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <DialogTitle>
                        {name}
                    </DialogTitle>

                    <DialogClose as={Button}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <StyledSeparator orientation={'horizontal'} />
                    <SlugDetails slug={name} />
                    <SlugViews slug={name} />
                </DialogDescription>

                <Flex css={{ marginTop: 25, fd: 'row', jc: 'flex-end', ai: 'flex-end', mb: '$1', mr: '$1', justifyContent: 'flex-end' }}>
                    <DialogClose key="green" as={'div'}>
                        <SlugProfileActions />
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <DialogTriggerButton name={name} />
        </Dialog>
    );
}

export default SlugProfile