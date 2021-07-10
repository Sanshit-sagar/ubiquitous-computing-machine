import React, { useState, useEffect } from 'react'

import { Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../../components/Loader'

const fetcher = url => axios.get(url).then(res => res.data)


function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const SearchBar = () => {
    // const [session, loading] = useSession()
    const email = 'sasagar@ucsd.edu'
    
    const [query, setQuery] = useState('')
    const [results, setResults] = useState()

    const { clickstream, loading, error } = useUserClickstreams(email, 30)

    if(loading) return <Loader />;
    
    return (
        <div>
            <Input
                value={query}
                onChange={async (e) => {
                    const { value } = e.currentTarget
                    // Dynamically load fuse.js
                    const Fuse = (await import('fuse.js')).default
                    const fuse = new Fuse(names)
        
                    setQuery(e.currentTarget)
                    setResults(fuse.search(value))
                }}
                placeholder="Search"
                type="text"
            /> 
            {
                results.length ? 
                <pre> Results: {JSON.stringify(results, null, 2)}</pre>
                : null
            }
        </div>
    )
}

export default SearchBar