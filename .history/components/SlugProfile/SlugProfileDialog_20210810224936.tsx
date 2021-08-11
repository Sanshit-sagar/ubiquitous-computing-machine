import React from 'react'

import { styled } from '@stitches/react';
import { mauve, blackA } from '@radix-ui/colors'

import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'

import { Text } from '../../primitives/Text'
import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'
import StyledSeparator from '../../primitives/Separator'
import { SlugViews } from './SlugViews'
import { LoadingSpinner } from '../Loader'

import { ellipses } from '../../lib/utils'

import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogClose, 
    DialogTitle, 
    DialogDescription 
} from '../../primitives/Dialog'

import useSWR from 'swr'
import toast from 'react-hot-toast'

import { 
    CornersIcon, 
    Cross2Icon, 
    CheckIcon, 
    Pencil1Icon, 
    PlusIcon, 
    DashIcon 
} from '@radix-ui/react-icons'

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
    height: '200px',
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
    fontSize: 12,
    marginTop: '2'
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

const detailKeys = ['Slug', 'Destination URL', 'Expiration', 'Password', 'IP Blacklist', 'UTM/SEO', 'HTTP Routing Status' ];
    
const ActionButton = ({ value, index }) => {
    const handleAction = () => {
        if(value?.length) {
            toast.success(`Updating ...`)
        } else {
            toast.success(`Adding ...`)
        }
    }

    return (
        <> 
            {index <= 2 ? <DashIcon /> : value?.length ? <Pencil1Icon /> : <PlusIcon />}
        </>
    )
}

const IndividualSlugDetail = ({ key, detail, index }) => {
    if(!detail || key > detailKeys.length) return;

    return (
        <SlugField>
            <Text> {`${detailKeys[index]}`} </Text>

            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>
                <Text> {detail?.length ? detail[1] : ''} </Text>
                <ActionButton value={detail[1]} index={index} />
            </Flex>
        </SlugField>
    )
}

const SlugDetails = ({ slug }) => {
    const { details, loading, error } = useSlugDetails({ slug })

    if(loading) return <LoadingSpinner />
    if(error || !details) return <Text> Error! </Text>

    let detailsArr = Object.entries(details);

    return (
        <SlugProfileDetailsContainer>
            {detailsArr.map(function(field, index) {
                return (
                    <IndividualSlugDetail 
                        key={index}
                        detail={field}  
                        index={index}
                    />
                );
            })}
        </SlugProfileDetailsContainer>
    )
}

const useClickstreamBySlug = (slug) => {
    const { data, error } =  useSWR(slug?.length ? `/api/clicks/bySlug/${slug}` : null)

    return {
        clicks: data || {},
        loading: !data && !error,
        error
    };
}

const EmptySlugClickstream = () => {
    return <Text> No clicks to show </Text>
}

const SlugClickstream = ({ slug }) => {
    const { clicks, loading, error } = useClickstreamBySlug(slug);

    if(loading) return <LoadingSpinner />
    if(!clicks || error) return <EmptySlugClickstream />

    return <Text> {JSON.stringify(clicks)} </Text>
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
                    <SlugClickstream slug={name} />
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