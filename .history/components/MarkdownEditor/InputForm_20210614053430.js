
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
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
            Discard
        <TrashIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
      </button>
    );
}

const UrlSlug = () => {

    return (
        <div className="sm:col-span-3">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Slug
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name="slug"
                    id="slug"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
            </div>
        </div>
    )
}

const UrlInput = () => {

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

const FormWrapper = () => {

    return (
        <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                    <UrlInput /> 
                    <UrlSlug /> 
                </div>
            </div>
        </div>
    )
}

function InputForm() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <FormWrapper /> 
        </div>

        <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <PublishButton /> 
        </div>
      </div>
    )
  }

export default InputForm  