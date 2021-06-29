
import React, { useContext } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../lib/utils'
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { GlobalStore } from '../../store';
import {  SaveIcon } from '@heroicons/react/outline'

import SideMenu from './SideMenu'
import { Card, Typography } from '@supabase/ui'
  
function NewSlugHeader() {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)
    const { data, error } = useSWR('/api/slugs/new', fetcher)

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


    const publish = async ({ slug, url, ttl }) => {
        if(!session || loading) return;
        if(!slug || !slug.length || !url || !url.length) return;

        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({ 
                slug, 
                url, 
                ttl,
                userEmail: session.user.email
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

        const slug = data ? `${data.slug}` : null
        const ttl = `${state.ttl}` || '';
        publish({ slug, url, ttl })
    }

    const PublishButton = () => {
        return (
            <div className="text-black mt-6 inline-flex justify-end align-stretch w-full">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white dark: text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleSubmit}
                    disabled={!session || loading}
                >
                    Publish
                    <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" />
                </button>
            </div> 
        )
    }

    return (
      <div className="bg-white px-2 py-4 mb-5 border-b border-gray-200 sm:px-3">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            
            <Typography.Title level={3}>
                Create new Slugs
            </Typography.Title>
            
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <PublishButton /> 
          </div>
        </div>
      </div>
    )
}

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
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                </span>
                <input
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
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block rounded-none rounded-r-md sm:text-sm border-gray-300"
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
            title='Expiration Date / Time To Live'
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



const BasicDetailsForm = () => {
    // const [session, loading] = useSession()
   
    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Destination URL"
                children={<UrlInput />}
            />
            <InputElementCardWrapper
                title="Custom Slug"
                title={'Select or enter a slug of your liking'}
                children={<UrlSlug />}
            /> 
        </div>
    )
}

function NewSlugCard() {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
    <div className="container mx-auto m-2 rounded-m">

        <div className="flex-col content-between bg-white rounded-md align-stretch p-4">
            <div className="text-black bg-white font-extralight w-full rounded-md ">
                
                <div className="w-full flex-col justify-items-stretch">
                    <NewSlugHeader /> 

                    <div className="w-full inline-flex justify-between items-stretch">
                        <div className="w-100 bg-white text-gray-700 mr-3 font-extralight">
                            <SideMenu /> 
                        </div>

                        {state.currentTab === 'basics' && <BasicDetailsForm /> }
                        {state.currentTab === 'expiry' && <CustomExpirationSelector />}
                        {/* {state.currentTab === 'rateLimit' && <RateLimitSelector />} */}
                        {/* {state.currentTab === 'password' && } */}
                        {/* { state.currentTab === 'seo' && <SeoTags />} */}
                    </div>
                </div>
            </div>
        </div>
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