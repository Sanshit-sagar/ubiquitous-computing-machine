
import React, { useState, useContext } from 'react';
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import {SaveIcon} from '@heroicons/react/solid'
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { GlobalStore } from '../../store';

const UrlSlug = () => {
    const { data, error } = useSWR('/api/slugs/new', fetcher)

    return (
        <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Slug
            </label>
            <div className="mt-1">
                {
                    !data && !error ? <p> loading...</p> 
                    : error ? <p> error... </p> 
                    : 
                        <input
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
            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                Destination URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    http://
                </span>
                <input
                    value={state.destinationUrl}
                    onChange={(event) => dispatch({ 
                        type: 'destination_url_update', 
                        payload: { 
                            value: event.target.value 
                        }
                    })}
                    type="url"
                    name="destination_url"
                    id="destination_url"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="www.example.com"
                />
            </div>
        </div>
    )
}

const ExpirySelector = () => {
    
    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Expiration (TTL)
                </label>
                <span className="text-sm text-gray-500" id="email-optional">
                    Optional
                </span>
            </div>
            <div className="mt-1">
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

const FormHeader = () => {

    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                New Slug
            </h3>
        </div>
    )
}


const FormWrapper = () => {
    const state = useContext(GlobalStore.State)
    const [session, loading] = useSession()

    const [slugWithPrefix, setSlugWithPrefix] = useState('')


    const handleExpirationChange = (event) => {
        setExpiry(event.target.value)
    }

    const publish = async ({ slug, url, ttl }) => {
        if(!slug || !slug.length || !url || !url.length) return;

        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({ 
                slug, url, ttl,
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
        } else {
            toast.success(`Success! ${message}`)
            setSlugWithPrefix(`https://analyticly.hashably.workers.dev/hashed/${slug}`);
        }
    }    

    const { data, error } = useSWR('/api/slugs/new', fetcher)

    const handleSubmit = () => {
        const slug = data ? `${data.slug}` : null
        const url = `${state.destinationUrl}`
        const ttl = `${state.ttl}`
        publish({ slug, url })
    }

    return (
        <>
            <FormHeader />
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                    <UrlInput /> 
                    <UrlSlug /> 
                    <ExpirySelector expiry={expiry} handleExpirationChange={handleExpirationChange} />
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                    disabled={!session || loading}
                >
                        Publish
                    <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                </button>

                <subtitle> 
                    {slugWithPrefix.length ? `Destination: ${slugWithPrefix}` : null} 
                </subtitle>
            </div>
        </>
    )
}

function InputForm() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <FormWrapper /> 
        </div>
      </div>
    )
  }

export default InputForm  