
import React, { useState, useEffect } from 'react'
import { HashtagIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
// import Dropdown from '../Dropdown'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const fetcher = url => fetch(url).then(r => r.json())

const useHashGenerator = (shouldFetch) => {
    const { data, error } = useSWR(() => shouldFetch ? '/api/hash/create' : null, fetcher);

    return {
        error, 
        loading: !data && !error, 
        hashmap: data ? data.hashes : null
    };
}

const HashSelector = ({ currentHash, setCurrentHash }) => {
    const [shouldFetch, setShouldFetch] = useState(true)
    const [clickCount, setClickCount] = useState(0)

    const { hashmap, loading } = useHashGenerator(shouldFetch)

    useEffect(() => {
        if(shouldFetch && hashmap && !loading) {
            setShouldFetch(false)
            setCurrentHash(hashmap.random)
        }
    }, [shouldFetch, currentHash, loading, hashmap])

    const handleClick = () => {
        setShouldFetch(true)
        setCurrentHash('')
        setClickCount(clickCount + 1)
    }

    return (
        <div className="ml-1">
            <h3 className="text-lg leading-6 font-medium text-gray-700">
                { currentHash.length ? `${currentHash}` :  `loading...` }
            </h3>
            <button onClick={handleClick}> 
                Re-generate {clickCount} -- {shouldFetch.toString()}
            </button>
        </div>
    )
}

const ActionOptions = ({ currentHash, setCurrentHash, savedAt, setSavedAt, statusLoading, setStatusLoading }) => {
    const [session, loading] = useSession()

    const publish = async (e) => {
        setStatusLoading(true)
        setSavedAt('--')
    
        const res = await fetch('/api/hash/publish', {
            body: JSON.stringify({
                hash: currentHash,
                email: session.user.username,
                content: { title: 'TODOTODO'}
            }),
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'POST',
        })
  
        const { didPublish, error } = await res.json()
        setStatusLoading(false)
    
        if (error) {
            return toast.error(`oh no! something went wrong, try again?`)
        }
        
        if(didPublish) {
            const timestamp = new Date().getTime().toString();
            toast.success('you are now subscribed!')
            setSavedAt(timestamp)
        } else {
            toast.error('you were already subscribed')
        }
    }

    return (
        <>
            <subtitle> {session ? session.user.email : 'loading'} </subtitle> 
            { currentHash.length ?  
                <div className="flex justify-end items-center">
                    <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => publish(e)}
                    >
                        { statusLoading ? 'loading...' : 'Publish' } 
                    </button>
                    <p> {{statusLoading} ? '...' : {savedAt}} </p>
                </div>
            : null}
        </>
    )
}

const Header = (props) => {
    const [session, loading] = useSession()

    const [statusLoading, setStatusLoading] = useState(false)
    const [savedAt, setSavedAt] = useState('')
    const [currentHash, setCurrentHash] = useState('')

    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <HashtagIcon className="h-5 w-5 text-blue-500"/>
                        <HashSelector 
                            statusLoading={statusLoading} 
                            savedAt={savedAt} 
                            setStatusLoading={setStatusLoading} 
                            setSavedAt={setSavedAt} 
                            currentHash={currentHash} 
                            setCurrentHash={setCurrentHash}
                        />
                    </div>
                </div>

                <div className="ml-4 mt-4 flex-shrink-0">
                    <ActionOptions 
                        statusLoading={statusLoading} 
                        savedAt={savedAt} 
                        setStatusLoading={setStatusLoading} 
                        setSavedAt={setSavedAt} 
                        currentHash={currentHash} 
                        setCurrentHash={setCurrentHash} 
                    /> 
                </div>
            </div>
        </div>
    )
}

export default Header