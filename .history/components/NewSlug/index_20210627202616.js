
import React, { useContext } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../lib/utils'
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { GlobalStore } from '../../store';
import {  SaveIcon } from '@heroicons/react/outline'


    
  
function NewSlugHeader() {
    return (
      <div className="bg-white px-2 py-4 mb-5 border-b border-gray-200 sm:px-3">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create a new URL
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Select or enter a slug that suits you best - short, pretty, secure or even welsh
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    )
}

const UrlSlug = () => {
    const { data, error } = useSWR('/api/slugs/new', fetcher)

    return (
        <div className="mt-6 mb-6">
            <label htmlFor="first_name" className="block text-sm font-extralight text-gray-600">
                Slug
            </label>
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
        </div>
    )
}

const UrlInput = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <div  className="col-span-3 sm:col-span-3">
            <label htmlFor="company_website" className="block text-sm font-extralight text-gray-600 ">
                Destination URL
            </label>
            <div className="mt-1 flex text-gray-600 font-extralight rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
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
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="www.example.com"
                />
            </div>
        </div>
    )
}

const TtlSelector = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-extralight text-gray-600">
                    Expiration (TTL)
                </label>
                <span className="text-sm font-extralight text-gray-600" id="email-optional">
                    Optional
                </span>
            </div>
            <div className="mt-1 font-extralight text-gray-600">
                <input
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
                    name="expiry"
                    id="expiry"
                    className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="MM/DD/YYYY"
                    aria-describedby="expiry-optional"
                />
            </div>
        </div>
    )
}


const BasicDetailsForm = () => {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

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

    const { data, error } = useSWR('/api/slugs/new', fetcher)

    const handleSubmit = () => {
        if(error) {
            toast.error(`Error! ${error.message}`)
            return; 
        }

        const slug = data ? `${data.slug}` : null
        const url = `${state.destination}`;
        const ttl = `${state.ttl}`;
        publish({ slug, url, ttl })
    }

    return (
    <div className="container mx-auto m-2 rounded-md bg-blue-50">

        <div className="flex-col content-between align-stretch p-4">
            <div className="text-black font-extralight w-full rounded-md ">
                
                <div className="flex-col justify-items-stretch">
                    <NewSlugHeader /> 
                    <UrlInput /> 
                    <UrlSlug /> 
                    {/* <TtlSelector /> */}
                </div>
            </div>

            {/* <div className="text-black  mt-6">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white dark: text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                    disabled={!session || loading}
                >
                    Publish
                    <SaveIcon 
                        className="ml-2 -mr-0.5 h-4 w-4" 
                        aria-hidden="true" 
                    />
                </button>
            </div> */}
        </div>
    </div>
    )
}

function NewSlug() {
    return (
        <div className="w-full h-full flex-col content-between align-stretch">
            <BasicDetailsForm /> 
        </div>
    )
  }

export default NewSlug  