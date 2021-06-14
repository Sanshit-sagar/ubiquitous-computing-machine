
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import {SaveIcon, TrashIcon} from '@heroicons/react/solid'

const PublishButton = () => {

    return (
    <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
            Publish
        <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
      </button>
    );
}


const DiscardButton = () => {

    return (
        <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Discard
        <TrashIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
      </button>
    );
}

const UrlSlug = ({ slug, handleSlugUpdate, data, error }) => {
    

    return (
        <div className="sm:col-span-3">
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

const UrlInput = ({ destinationUrl, handleDestUrlUpdate }) => {

    return (
        <div className="col-span-3 sm:col-span-2">
            <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                Destination URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    http://
                </span>
                <input
                    value={destinationUrl}
                    onChange={handleDestUrlUpdate}
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
    const [destinationUrl, setDestinationUrl] = useState('')
    const [slug, setSlug] = useState('')

    const handleDestUrlUpdate = (event) => {
        setDestinationUrl(event.target.value)
    }

    const handleSlugUpdate = (event) => {
        setSlug(event.target.value)
    }

    const publish = async (dataToSave) => {
        // Default options are marked with *
        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({
              message: dataToSave,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        const { message } = await res.json()
        alert(message)
    }    

    const { data, error } = useSWR('/api/slugs/new', fetcher)

    const handleSubmit = () => {
        const message = `submitting... ${data.slug}  -- ${destinationUrl}`
        const dataToSave = { message }
        publish(dataToSave)
        // alert(JSON.stringify(dataToSave))
    }

    return (
        <>
            <FormHeader />
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                    <UrlInput destinationUrl={destinationUrl} handleDestUrlUpdate={handleDestUrlUpdate} /> 
                    <UrlSlug slug={slug} handleSlugUpdate={handleSlugUpdate} data={data} error={error} /> 
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                >
                        Publish
                    <SaveIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                </button>
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