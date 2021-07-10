import React, { useState, useEffect } from 'react'

import { Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'

import Loader from '../../components/Loader'

const SearchBar = () => {
    const [session, loading] = useSession()
    
    const [query, setQuery] = useState('')
    const [results, setResults] = useState()

    const names = ['Tim', 'Joe', 'Bel', 'Max', 'Lee']

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
        <pre>Results: {JSON.stringify(results, null, 2)}</pre>
        </div>
    )
}

export default SearchBar