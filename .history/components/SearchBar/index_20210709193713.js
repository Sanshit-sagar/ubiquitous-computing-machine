import React, { useState, useEffect } from 'react'

import { Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'

import Loader from '../../components/Loader'

const SearchBar = () => {
    const [session, loading] = useSession()
    
    const [searchQuery, setSearchQuery] = useState('')
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (searchInput && searchInput.length > 4) {
            setSearchQuery(searchInput.toLowerCase())
        }
    }, [searchInput]);

    if(loading) return <Loader />;
    
    return (
        <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
            type="text"
        /> 
    )
}

export default SearchBar