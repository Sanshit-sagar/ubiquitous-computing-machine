
import React, { useContext } from 'react';
import { useSession } from 'next-auth/client';

import { Button, Card, Elevation } from '@blueprintjs/core'
import toast from 'react-hot-toast';
import useSWR from 'swr'


import { NewSlugStore } from '../../store'
import NewSlugSteps from './NewSlugSteps'
import DestinationUrl from './DestinationUrl'
import PersonalizedSlug from './PersonalizedSlug'
import ExpirationDateTime from './ExpirationDateTime'
import IpBlacklist from './IpBlacklist'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
import EncryptionInput from './EncryptionInput'
import CampaignTracker from './CampaignTracker'

import VerticalTabs from '../../primitives/VerticalTabs'

// function NewSlugMenu() {
//     const state = useContext(NewSlugStore.State)
//     const dispatch = useContext(NewSlugStore.Dispatch)

//     const handleTabChange = (tabId) => {
//         dispatch({
//             type: 'assign',
//             payload: {
//                 key: 'currentTab',
//                 value: tabId
//             }
//         }); 
//     }

//     return (
        
//     );
// }

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <div className="w-full align-col justify-start align-stretch m-2 p-1">
            <Card interactive={true} elevation={Elevation.TWO}>
                <h5>
                    <span className="text-md font-extralight text-black">
                        {title}
                    </span>        
                </h5>
                <span className="text-sm font-extralight text-gray-700"> 
                    {description} 
                </span>
                
                <div className="mt-6">
                    <span className="text-sm font-extralight text-gray-700">
                        {children}
                    </span> 
                </div>
            </Card>
        </div>
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
                url, 
                config,
                userEmail: session.user.email
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
            toast.success(`Success! ${message}`)
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
        <Card>
            <div className="py-6 px-4 w-full h-full flex-col justify-items-start align-stretch">
                <div> 
                    <NewSlugSteps /> 
                </div>
                <div> 
                    <VerticalTabs 
                        urlInput={<DestinationUrl mutate={assignmentMutation} />}
                        slugInput={<PersonalizedSlug mutate={assignmentMutation} />}
                        ttlInput={<ExpirationDateTime mutate={assignmentMutation} />}
                        blacklistInput={<IpBlacklist mutate={assignmentMutation} />}
                        encryptionInput={<EncryptionInput mutate={assignmentMutation} />}
                        campaignTracker={<CampaignTracker mutate={assignmentMutation} />}
                    /> 
                </div>
            </div>
                
            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                <Button
                    onClick={handleSubmit}
                    disabled={!session}
                    loading={loading || dataLoading}
                    type="submit"
                    rightIcon="floppy-disk"
                    intent="success"
                >
                    Save
                </Button> 
            </div>
        </Card>
    );
}
  
export default NewSlug  