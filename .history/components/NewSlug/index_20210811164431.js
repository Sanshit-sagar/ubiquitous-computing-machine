
import React, { useContext } from 'react';
import { useSession } from 'next-auth/client';

import toast from 'react-hot-toast';
import useSWR from 'swr'

import { NewSlugStore } from '../../store'

import DestinationUrl from './DestinationUrl'
import PersonalizedSlug from './PersonalizedSlug'
import ExpirationDateTime from './ExpirationDateTime'
import IpBlacklist from './IpBlacklist'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
import EncryptionInput from './EncryptionInput'
import RedirectionStatus from './RedirectionStatus'

import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'
import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'

import CustomToolbar from '../../primitives/Toolbar'
import VerticalTabs from '../../primitives/VerticalTabs'
import StyledSeparator from '../../primitives/Separator'

import { 
    LightningBoltIcon, 
    TimerIcon, 
    TargetIcon, 
    CircleBackslashIcon, 
    LockClosedIcon, 
    CodeIcon, 
    UploadIcon
} from '@radix-ui/react-icons'

const VerticalTabsWrapper = ({ urlInput, slugInput, ttlInput, blacklistInput, encryptionInput, redirectionStatus }) => {
    
    let tabItems = [
        {id: 'url', title: 'Destination', content: urlInput, icon:  <TargetIcon /> },
        {id: 'slug', title: 'Slug', content: slugInput, icon:  <LightningBoltIcon /> },
        {id: 'ttl', title: 'Expiry', content: ttlInput, icon:  <TimerIcon /> },
        {id: 'blacklist', title: 'Blacklist', content:  blacklistInput, icon:  <CircleBackslashIcon />  },
        {id: 'security', title: 'Security', content: encryptionInput, icon:  <LockClosedIcon /> },
        {id: 'routingStatus', title: 'Routing', content: redirectionStatus, icon: <CodeIcon /> },
        {id: 'qrCode', title: 'QR Code', content: qrCode, icon: null },
    ];

    return (
        <VerticalTabs tabItems={tabItems} />
    );
}

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <Flex css={{ width: '100%', my: '$3', mx: '$2', padding: '$1', fd: 'column', jc: 'flex-start', ai: 'stretch' }}>    
            <Box css={{ padding: '20px', border: 'thin solid', borderColor: '$hiContrast', bc: '$loContrast', borderRadius: '$1' }}>
                <Box css={{ mb: '$3', mt: '$1' }}>
                    <Heading size='$1'> {title} </Heading>
                    <Text size='$1' css={{ mt: '$2' }}> 
                        {description} 
                    </Text>
                </Box>

                <StyledSeparator />
                
                <Box css={{ mt: '$4' }}>
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}

const useNewSlugInfo = () => {
    const { data, error } = useSWR('/api/slugs/new')

    return {
        data: data,
        dataLoading: !data && !error,
        dataError: error,
    }; 
}

const NewSlug = () => {
    const [session, loading] = useSession()

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { data, dataLoading, dataError } = useNewSlugInfo(); 
 
    const assignmentMutation = (key, value) => {
        dispatch({
            type: 'assign',
            payload: {
                key: key,
                value: value,
            }
        })
    }

    const mutateGlobalCache = ({ slug }) => {
        dispatch({
            type: 'publish_link',
            payload: {
                slug
            }
        });
        // CALL PRISMA HERE TO SAVE THE NEW ENTRY
    }

    const clearStaleInput = () => {
        dispatch({
            type: 'clear_inputs',
        })
    }

    const publish = async (slug, url, config, toastId) => {
        if(!session || loading || dataLoading) return;
        if(!slug || !slug.length || !url || !url.length) return;

        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({ 
                slug, 
                user: session.user.email,
                url, 
                config
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        const { didSave, message, error } = await res.json()

        if(toastId) {
            toast.dismiss(toastId);
        } else {
            toast.dismiss();
        }
        
        if(error) {
            toast.error(`Error! ${error}`)
        } else if(!didSave && message) {
            toast.error(`Unknown Error: ${message}`)
        } else {
            toast.success(`${message}`)
            mutateGlobalCache({ slug });
            clearStaleInput();
        }
    }   

    const handleSubmit = () => {
        let url =  `${state.destination}` || ''
        let slug = data ? `${data.slug}` : null
        let ttl = `${state.ttl}` || ''
        if(ttl) {
            ttl = new Date(ttl).getTime().toString()
        }
        let password = `${state.password}` || ''
        let blacklist = state.blacklist.length ? [...state.blacklist] : []
        let seoTags = state.seoTags.length ? [...state.seoTags] : []
        let routingStatus = state.routingStatus || '301'

        const config = { ttl, password, blacklist, seoTags, routingStatus }; 
        const toastId = toast.loading('Creating your new slug...');
        publish(slug, url, config, toastId)
    }

    if(dataError) {
        toast.error(dataError); 
    }
 
    return (
        <Box css={{ height: '100%', width: '1310px', overflowY: 'hidden', overflowX: 'hidden', pt: '$1' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start',ai: 'stretch', flexWrap: 'wrap', gap: '$2' }}>                
    
                <CustomToolbar />
                
                <VerticalTabsWrapper 
                    urlInput={<DestinationUrl  />}
                    slugInput={<PersonalizedSlug />}
                    ttlInput={<ExpirationDateTime mutate={assignmentMutation} />}
                    blacklistInput={<IpBlacklist mutate={assignmentMutation} />}
                    encryptionInput={<EncryptionInput mutate={assignmentMutation} />}
                    redirectionStatus={<RedirectionStatus mutate={assignmentMutation} />}
                /> 
                    
                <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
                    <Button
                        onClick={handleSubmit}
                        disabled={!session}
                        loading={loading}
                    >
                        <AccessibleIcon label={`Save`}>
                            <UploadIcon /> 
                        </AccessibleIcon>

                        <Box css={{ my: '$1' }}>
                            <Text> Save </Text>
                        </Box>
                    </Button>
                </Flex>

            </Flex>
        </Box>
    );
}
  
export default NewSlug  