import React, { useState, useEffect } from 'react';
import { Input } from '@supabase/ui'


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (searchInput && searchInput.length > 4) {
            setSearchQuery(searchInput.toLowerCase())
        }
    }, [searchInput]);

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