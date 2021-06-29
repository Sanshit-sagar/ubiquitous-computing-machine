import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

const SearchBar = () => {

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Search
            </label>

            <div className="relative text-gray-900 focus-within:text-gray-600 bg-green-100" >
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                    id="search"
                    className="block w-full bg-gray-200 focus:bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-gray-900 rounded-md leading-5 text-gray-900 placeholder-gray-900 focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                />
            </div>
        </div>
    )
}
  
export default SearchBar