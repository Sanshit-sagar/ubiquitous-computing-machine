
import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/client';
import { GlobalStore } from '../../store';

import toast from 'react-hot-toast';
import axios from 'axios'
import useSWR from 'swr'
import SideMenu from './SideMenu'
import TagManager from './TagManager'
import BlacklistInputContent from './BlacklistInputContent'

const fetcher = url => axios.get(url).then(res => res.data)

import { Card, Typography, IconActivity, Input, Button, Radio } from '@supabase/ui'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
  
// function NewSlugActions() {
//     const [session, loading] = useSession()

//     const state = useContext(GlobalStore.State)
//     const dispatch = useContext(GlobalStore.Dispatch)

//     const { data, error } = useSWR('/api/slugs/new')

//     const mutateGlobalCache = ({ slug }) => {
//         dispatch({
//             type: 'publish_link',
//             payload: {
//                 slug
//             }
//         });
//     }

//     const clearStaleInput = () => {
//         dispatch({
//             type: 'clear_stale_input',
//         })
//     }


//     const publish = async ({ slug, url, ttl }) => {
//         if(!session || loading) return;
//         if(!slug || !slug.length || !url || !url.length) return;

//         const res = await fetch('/api/slugs/save', {
//             body: JSON.stringify({ 
//                 slug, 
//                 url, 
//                 ttl,
//                 userEmail: session.user.email
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             method: 'POST',
//         })
//         const { didSave, message, error } = await res.json()
        
//         if(error) {
//             toast.error(`Error! ${error}`)
//         } else if(!didSave && message) {
//             toast.error(`Unknown Error: ${message}`)
//         } else {
//             toast.success(`Success! ${message}`)
//             mutateGlobalCache({ slug, url, ttl });
//             clearStaleInput();
//         }
//     }   

//     const handleSubmit = () => {
//         if(error) {
//             toast.error(`Error! ${error.message}`)
//             return; 
//         }

//         const slug = data ? `${data.slug}` : null
//         const ttl = `${state.ttl}` || '';
//         publish({ slug, url, ttl })
//     }

//     const PublishButton = () => {
//         return (
//             <div className="text-black mt-6 inline-flex justify-end align-stretch w-full">
//                 <Button
//                     className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white dark: text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                     onClick={handleSubmit}
//                     disabled={!session || loading}
//                 >
//                     <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" />
//                 </Button>
//             </div> 
//         )
//     }

//     return (
//       <div className="bg-white px-2 py-4 mb-5 border-b border-gray-200 sm:px-3">
//         <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
//           <div className="ml-4 mt-4">
            
//             <Typography.Title level={3}>
//                 Create new Slugs
//             </Typography.Title>
            
//           </div>
//           <div className="ml-4 mt-4 flex-shrink-0">
//             <PublishButton /> 
//           </div>
//         </div>
//       </div>
//     )
// }

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

const UrlInput = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <div  className="flex-col justify-start align-stretch">
            <div className="mt-1 flex text-gray-600 font-extralight rounded-md shadow-sm">
                <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                </span>
                <Input
                    value={state.destination}
                    onChange={(event) => dispatch({ 
                        type: 'update_destination', 
                        payload: { 
                            value: event.target.value 
                        }
                    })}
                    type="url"
                    name="destination"
                    id="destination"
                    actions={[
                        <Button type="dashed" icon={<IconActivity />}>
                          Check status
                        </Button>,
                        <Button danger>Remove</Button>,
                    ]}
                    className="flex-1 block  rounded-md border-gray-300"
                    placeholder="www.example.com"
                />
            </div>
        </div>
    )
}

const InputElementCardWrapper = ({ title, description, children }) => {

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

const CustomExpirationSelector = () => {
    const state = useContext(GlobalStore.State)

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
                        dispatch({
                            type: 'update_ttl',
                            payload: {
                                value: event.target.value
                            }
                        })
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

const CustomRoutingRulesSelector = () => {
    const [selected, setSelected] = useState('301')
        
    return (
        <InputElementCardWrapper
            title='Expiration [Time To Live]'
            description='When should this link go offline?'
            children={
                <Radio.Group
                    type="cards"
                    label="Group of radios"
                    labelOptional="Optional label"
                    descriptionText="You can also show label hint text here"
                >
                    <>
                        <Radio
                            label="HTTP 301"
                            description="Moved Permanently [most common]"
                        />
                        <Radio
                            label="HTTP 302"
                            description="Moved Temporarily"
                        />
                        <Radio
                            label="HTTP 307"
                            description="TODO"
                        />
                    </>
                </Radio.Group> 
            }
        />
    );
}



const DestinationSlugInput = () => {

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                title={'Select or enter a slug of your liking'}
                children={<UrlSlug />}
            /> 
        </div>
    )
}

const DestinationUrlInput = () => {
    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Destination URL"
                description="Where should visitors be directed?"
                children={<UrlInput />}
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

function NewSlugCard() {
    const [session, sessionLoading] = useSession()
    const [submitLoading, setSubmitLoading] = useState(false)

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    
    const handleSubmit = () => {
        setSubmitLoading(true)
        alert('Submit is loading...')
        setSubmitLoading(false)
        toast.success({ message: `Successfully saved your new slug`})
    }

    const handleCancel = () => {
        setCancelLoading(true)
        alert('Cancel is loading...')
        setCancelLoading(false)
        toast.success({ message: `Successfully cancelled your slug`})
    }

    const NewSlugHeader = () => {
        return (
            <>
                <Typography.Title level={2}>
                    Create New Slug yoyoyo
                </Typography.Title>
                <Typography variant="secondary">
                    Create a new alias for your web resource and begin customizing and tracking traffic
                </Typography>
            </>
        )
    }

    return (
        <div className="container mx-auto m-2 rounded-m">
            <Card title={<NewSlugHeader />}>
                <div className="w-full inline-flex justify-between items-stretch">
                    <div className="w-100 bg-white text-gray-700 mr-3 font-extralight">
                        <SideMenu /> 
                    </div>

                    {state.currentTab === 'destination' && <DestinationUrlInput />}
                    {state.currentTab === 'slug' && <DestinationSlugInput />}
                    {state.currentTab === 'ttl' && <CustomExpirationSelector />}
                    {/* {state.currentTab === 'rateLimit' && <RateLimitSelector />} */}
                    {state.currentTab === 'blacklists' && <BlacklistInput />}
                    { state.currentTab === 'redirects' && <CustomRoutingRulesSelector /> }
                    { state.currentTab === 'seo' && <TagManager />}
                </div>

                <div className="inline-flex justify-end align-stretch w-full">
                    <Button 
                        type="outline"
                        size="small"
                        icon={<XCircleIcon className="h-6 w-6 text-green" />}
                        loading={sessionLoading}
                        disabled={!session || !session?.user || submitLoading}
                        onClick={handleCancel}
                        shadow={true}
                        className="mr-4"
                    >
                        cancel
                    </Button>
                    <Button 
                        type="primary"
                        size="small"
                        icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
                        loading={submitLoading || sessionLoading}
                        disabled={!session || !session?.user}
                        onClick={handleSubmit}
                        shadow={true}
                    >
                        save
                    </Button>
                </div>
            </Card>
        </div>
    )
}

function NewSlug() {
    return (
        <div className="w-full h-full flex-col content-between align-stretch">
            <NewSlugCard /> 
        </div>
    )
  }

export default NewSlug  