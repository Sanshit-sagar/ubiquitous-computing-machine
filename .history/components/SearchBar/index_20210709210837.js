import React, { useState, useEffect } from 'react'

import { Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import Loader from '../../components/Loader'

// const fetcher = url => axios.get(url).then(res => res.data)

// function useUserClickstreams(email, timeFilter)  {
//     const time = timeFilter || '30'
//     const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

//     return {
//         clickstream: data ? data.clickstream : [],
//         loading: !data && !err,
//         error: err
//     };
// }

const clicks = [
    {slug: 'Tim', url: 'https://tim.com', views: 3},
    {slug: 'Joe', url: 'https://joe.com', views: 2},
    {slug: 'Bel', url: 'https://bel.com', views : 3},
    {slug: 'Max', url: 'https://max.com', views : 2},
    {slug: 'Lee', url: 'https://lee.com', views: 4},
]; 

const SearchBar = () => {
    // const [session, loading] = useSession()
    const email = 'sasagar@ucsd.edu'
    
    const [results, setResults] = useState()

    return (
        <div>
        <Input
            type="text"
            placeholder="Search"
            onChange={async (e) => {
                const { value } = e.currentTarget
                let options = {
                    includeScore: true,
                    keys: ['slug', 'url', 'views'],
                };
                const Fuse = (await import('fuse.js')).default
                const fuse = new Fuse(clicks, options)

                let temp = [];
                let results = fuse.search(value)
                results.map(function(value, index) {
                    temp.push({ 
                        'slug': value.slug, 
                        'index': value.refIndex 
                    }); 
                });
                setResults(temp); 
            }}
        />
        <pre> Results: {JSON.stringify(results, null, 2)}</pre>
        </div>
    )
}

export default SearchBar