
import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/client';

import { GlobalStore, NewSlugStore } from '../../store'

import toast from 'react-hot-toast';
import axios from 'axios'
import useSWR from 'swr'

import SideMenu from './SideMenu'
import TagManager from './TagManager'
import BlacklistInputContent from './BlacklistInputContent'
import EncryptionInput from './EncryptionInput'

const fetcher = url => axios.get(url).then(res => res.data)

import { Card, Typography, IconActivity, Input, Button, Radio } from '@supabase/ui'
import { SaveIcon } from '@heroicons/react/solid';
// CheckCircleIcon, XCircleIcon, 
  
const UrlSlug = () => {
    const { data, error } = useSWR('/api/slugs/new', fetcher)

    return (
        <div className="mt-1">
            {
                !data && !error ? <p> loading...</p> 
                : error ? <p> error... </p> 
                : <input
                        value={data.slug}
                        type="text"
                        name="slug"
                        id="slug"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
            }
        </div>
    )
}

const UrlInput = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <div  className="flex-col justify-start align-stretch">
            <div className="mt-1 flex text-gray-600 font-extralight rounded-md shadow-sm">
                <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                </span>
                <Input
                    value={state.destination}
                    onChange={(event) => mutate('destination', event.target.value)}
                    type="url"
                    name="destination"
                    id="destination"
                    actions={[
                        <Button 
                            type="dashed" 
                            icon={<IconActivity />}
                        >
                          Open Graph
                        </Button>
                    ]}
                    className="flex-1 block rounded-md border-gray-300"
                    placeholder="www.example.com"
                />
            </div>
        </div>
    )
}

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <div className="w-full align-col justify-start align-stretch m-2 p-1">
            <Card title={
                    <>
                        <Typography.Title level={4} type="primary">
                            {title}
                        </Typography.Title>

                        <Typography type="secondary">
                            {description} 
                        </Typography>
                    </>
                }
            >
                {children}
            </Card>
        </div>
    )
}

const CustomExpirationSelector = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <InputElementCardWrapper
            title='Expiration [Time To Live]'
            description='When should this link go offline?'
            children={
               
                <input 
                    name="ttl" 
                    id="ttl" 
                    value={state.ttl}
                    onChange={(event) => {
                        mutate('ttl', event.target.value)
                    }}
                    type="datetime-local"
                    className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="MM/DD/YYYY"
                    aria-describedby="expiry-optional"
                />
            }
        />
    );
}

const CustomRoutingRulesSelector = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
        
    return (
        <InputElementCardWrapper
            title='Redirection Status Code'
            description='How should incoming requests be re-directed?'
            children={
                
                <Radio.Group
                    type="cards"
                    label="Select the status code which should be used to redirect web traffic for your link"
                    labelOptional="Optional label-TODO"
                    descriptionText="Hint-TODO"
                    value={state.routingStatus}
                    onChange={(event) => mutate('routingStatus', event.target.value)}
                >
                    <>
                        <p> {state.routingStatus} </p>
                        <Radio
                            label="HTTP 301"
                            description="Moved Permanently [most common]"
                            value="301"
                        />
                        <Radio
                            label="HTTP 302"
                            description="Moved Temporarily"
                            value="302"
                        />
                        <Radio
                            label="HTTP 307"
                            description="TODO"
                            value="307"
                        />
                    </>
                </Radio.Group> 
            }
        />
    );
}



const DestinationSlugInput = ({ mutate }) => {

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                title={'Select or enter a slug of your liking'}
                children={<UrlSlug mutate={mutate} />}
            /> 
        </div>
    )
}

const DestinationUrlInput = ({ mutate }) => {
    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Destination URL"
                description="Where should visitors be directed?"
                children={<UrlInput mutate={mutate} />}
            />
        </div>
    )
}

const BlacklistInput = () => {
    return (
        <InputElementCardWrapper
            title="Destination URL"
            description="Where should visitors be directed?"
            children={<BlacklistInputContent />}
        />
    )
}


function NewSlugActions() {
    const [session, loading] = useSession()

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { data, error } = useSWR('/api/slugs/new')

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
            type: 'clear_stale_input',
        })
    }


    const publish = async (slug, url, ttl) => {
        // if(!session || loading) return;
        if(!slug || !slug.length || !url || !url.length) return;

        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({ 
                slug, 
                url, 
                ttl,
                userEmail: 'sasagar@ucsd.edu'
                // userEmail: session.user.email
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        const { didSave, message, error } = await res.json()
        
        if(error) {
            toast.error(`Error! ${error}`)
        } else if(!didSave && message) {
            toast.error(`Unknown Error: ${message}`)
        } else {
            toast.success(`Success! ${message}`)
            mutateGlobalCache({ slug, url, ttl });
            clearStaleInput();
        }
    }   

    const handleSubmit = () => {
        if(error) {
            toast.error(`Error! ${error.message}`)
            return; 
        }

        const url =  `${state.destination}` || '';
        const slug = data ? `${data.slug}` : null
        const ttl = `${state.ttl}` || '';

        alert(`Saving url: ${url}, slug: ${slug}, ttl: ${ttl}`);
        publish(slug, url, ttl)
    }

    const PublishButton = () => {
        return (
            <div className="text-black mt-6 inline-flex justify-end align-stretch w-full">
                <Button
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white dark: text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleSubmit}
                    // disabled={!session || loading}
                >
                    {/* <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" /> */}
                    Publish
                </Button>
            </div> 
        )
    }

    return (
        // <div className="ml-4 mt-4 flex-shrink-0">
        <PublishButton /> 
        // </div>
    )
}


function NewSlugCard() {
    // const [session, sessionLoading] = useSession()
    // const [submitLoading, setSubmitLoading] = useState(false)
    // const [cancelLoading, setCancelLoading] = useState(false)

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    
    // const handleSubmit = () => {
    //     setSubmitLoading(true)
    //     alert('Submit is loading...')
    //     setSubmitLoading(false)
    //     toast.success(`Successfully saved your new slug`)
    // }

    // const handleCancel = () => {
    //     setCancelLoading(true)
    //     alert('Cancel is loading...')
    //     setCancelLoading(false)
    //     toast.success(`Discarded your input`)
    // }

    const assignmentMutation = (key, value) => {
        dispatch({
            type: 'assign',
            payload: {
                key: key,
                value: value,
            }
        })
    }

    const NewSlugHeader = () => {
        return (
            <div className="w-full flex-col justify-start align-start">
                <Typography.Title level={2}>
                    Create New Slug
                </Typography.Title>
                <Typography variant="secondary">
                    Create a new alias for your web resource and begin customizing and tracking traffic
                </Typography>
            </div>
        )
    }

    return (
        <div className="container mx-auto w-full m-2 rounded-m">
            <Card title={<NewSlugHeader />}>
                <div className="w-full inline-flex justify-between items-stretch">
                    <div className="w-100 bg-white text-gray-700 mr-3 font-extralight">
                        <SideMenu /> 
                    </div>

                    {state.currentTab === 'destination' && <DestinationUrlInput mutate={assignmentMutation} />}
                    {state.currentTab === 'slug' && <DestinationSlugInput mutate={assignmentMutation} />}
                    {state.currentTab === 'ttl' && <CustomExpirationSelector mutate={assignmentMutation} />}
                    {state.currentTab === 'password' && <EncryptionInput />}
                    {state.currentTab === 'blacklists' && <BlacklistInput />}
                    { state.currentTab === 'redirects' && <CustomRoutingRulesSelector mutate={assignmentMutation} /> }
                    {/* rate limiter, A/B testing */}
                    { state.currentTab === 'seo' && <TagManager />}
                </div>

                <NewSlugActions />
            </Card>
        </div>
    )
}

function NewSlug() {
    return (
        <div className="w-full h-full mb-4 flex-col content-between align-stretch">
            <NewSlugCard /> 
        </div>
    )
  }

export default NewSlug  