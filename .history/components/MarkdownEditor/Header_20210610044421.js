
import React, { useState, useEffect } from 'react'
import { HashtagIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import Dropdown from '../Dropdown'
import useSWR from 'swr'

const PublishedStatusDropdown = () => {
    return (
        <Dropdown />
    )
}

const fetcher = url => fetch(url).then(r => r.json())

const useHashGenerator = (shouldFetch) => {
    const { data, error } = useSWR(() => shouldFetch ? '/api/hash/create' : null, fetcher);

    return {
        error, 
        loading: !data && !error, 
        hashmap: data ? data.hashes : null
    };
}

const HashSelector = () => {
    const [shouldFetch, setShouldFetch] = useState(true)
    const [clickCount, setClickCount] = useState(0)
    const [currentHash, setCurrentHash] = useState('')

    const { hashmap, loading } = useHashGenerator(shouldFetch)

    useEffect(() => {
        if(shouldFetch && hashmap && !loading) {
            setShouldFetch(false)
        }
    })

    const handleClick = () => {
        setShouldFetch(false)
        setClickCount(clickCount + 1)
        setCurrentHash(hashmap.random)
    }

    return (
        <div className="ml-1">
            <h3 className="text-lg leading-6 font-medium text-gray-700">
                { currentHash.length ? `${currentHash}` :  `loading...` }
            </h3>
            <button onClick={handleClick}> 
                Re-generate {clickCount}
            </button>
        </div>
    )
}

const ActionOptions = () => {

    return (
        <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Publish
        </button>
    )
}

const Header = (props) => {
    // const [session, loading] = useSession()

    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <HashtagIcon className="h-5 w-5 text-blue-500"/>
                        <HashSelector />
                    </div>
                </div>

                <div className="ml-4 mt-4 flex-shrink-0">
                    <ActionOptions /> 
                </div>
            </div>
        </div>
    )
}

export default Header