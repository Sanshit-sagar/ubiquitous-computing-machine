import React from 'react'

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
import Loader from '../Loader'

import useSWR from 'swr'
import { mauve, blackA } from '@radix-ui/colors'

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
    width: '100%',
    height: '150px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '$2',
    padding: '$1',
    border: 'thin solid silver',
    borderRadius: '5px',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    backgroundColor: mauve.mauve2,
    color: blackA.blackA12
});

function formatDestination(url) {
    let urlObj = new URL(url);
    return urlObj.hostname;
}

function formatDetails(details) {
    return {
        slug: details ? details?.slug || '' : '',
        destination: details && details?.url ? formatDestination(details.url) : '',
        ...details?.config,
    };
}

const useSlugDetails = ({ slug }) => {
    const { data, error } = useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);
    console.log(data ? `got the data ${JSON.stringify(data)}` : 'no data');

    return {
        details: data ? formatDetails(data.details) : null,
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

const SlugField = styled('span', {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    color: blackA.blackA12,
    lineHeight: 1,
    fontSize: 12
});

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

const detailKeys = ['Slug', 'Destination URL', 'Expiration', 'Password', 'IP Blacklist', 'HTTP Routing Status' ];
    

const IndividualSlugDetail = ({ key, detail }) => {
    if(!detail || key > detailKeys.length) return;

    return (
        <SlugField>
            <Text> {detailKeys[parseInt(key)]} </Text>
            <Text> {detail?.length ? detail[1] : ''} </Text>
        </SlugField>
    )
}

const SlugDetails = ({ slug }) => {
    const { details, loading, error } = useSlugDetails({ slug })

    if(loading) return <Loader />
    if(error || !details) return <Text> Error! </Text>

    let detailsArr = Object.entries(details);

    return (
        <SlugProfileDetailsContainer>
            {detailsArr.map(function(field, index) {
                return (
                    <IndividualSlugDetail 
                        key={index}
                        detail={field}  
                    />
                );
            })}
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