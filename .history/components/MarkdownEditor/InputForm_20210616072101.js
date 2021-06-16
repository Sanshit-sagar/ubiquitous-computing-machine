
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
        <div className="mt-6 mb-6">
            <label htmlFor="first_name" className="block text-sm font-large text-gray-700">
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
            <label htmlFor="company_website" className="block text-sm font-large text-gray-700">
                Destination URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
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
                <label htmlFor="email" className="block text-sm font-large text-gray-700">
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

// const FormHeader = () => {

//     return (
//         <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//                 New Slug
//             </h3>
//         </div>
//     )
// }


const FormWrapper = () => {
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
        <>
            {/* <FormHeader /> */}
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6 w-full mx-5 my-5">
                <div className="flex-col justify-items-stretch">
                    <UrlInput /> 
                    <UrlSlug /> 
                    <TtlSelector />
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-4 sm:px-6">
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

                <subtitle> 
                    {state.publishedLink.length ? `Destination: ${state.publishedLink}` : null} 
                </subtitle>
            </div>
        </>
    )
}

function InputForm() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
            {navigation.map((item) => (
                <a
                key={item.name}
                href={item.href}
                className={classNames(
                    item.current
                    ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                    'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
                >
                <item.icon
                    className={classNames(
                    item.current
                        ? 'text-indigo-500 group-hover:text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                    )}
                    aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
                </a>
            ))}
            </nav>
        </aside>
        
        <div className="px-4 py-5 sm:p-6">
            <FormWrapper /> 
        </div>
      </div>
    )
  }

export default InputForm  