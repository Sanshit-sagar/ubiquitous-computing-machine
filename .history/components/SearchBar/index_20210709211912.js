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
    {slug: 'HOE', url: 'https://hoe.com', views: 6},
]; 

const ResultsPopover = ({ results, timestamp, length }) => {

    return (
        <pre> 
            
            {results.map(function(value, index) {
                return (
                    <div keys={index}>
                        <span className="w-full inline-flex justify-between align-start">
                            <span className="text-sm text-black dark:text-white">
                                {`${index}:${JSON.stringify(value)}`}
                            </span>
                        </span> 
                    </div>
                )
            })}
        </pre>
    )
}

const SearchBar = () => {
    // const [session, loading] = useSession()
    const email = 'sasagar@ucsd.edu'
    
    const [results, setResults] = useState()

    return (
        <>
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
                            slug: value.item.slug, 
                            index: value.refIndex,
                            score: value.score,
                        }); 
                    });
                    setResults(temp); 
                }}
            />
            <ResultsPopover 
                results={results}
                timestamp={new Date().getTime().toString()}
                len={results.length}
            /> 
        </>
    )
}

export default SearchBar