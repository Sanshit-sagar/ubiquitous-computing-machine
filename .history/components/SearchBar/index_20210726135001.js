import React, { useContext, useState, useEffect } from 'react'

import { Input } from '@supabase/ui'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'

import { ellipses } from '../../lib/utils'
import { NewSlugStore } from '../../store'

import Loader from '../Loader'

import {
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '../../primitives/Popover'

import HorizontalTabs from '../../primitives/Tabs'
import IconButton from '../../primitives/IconButton'
import ScrollView from '../../primitives/ScrollView'
import ToggleButton from '../../primitives/Toggle'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'

import NoSearchResults from '../EmptyStates/NoSearchResults'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const useUserClickstream = (email) => {
    const { data, error } =  useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null)
    
    return {
        clickstream: data ? data.links : null,
        isLoading: !data && !error,
        isError: error
    }
}

const MagnifyingGlassIconSvg = () => {

    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd"
            >
            </path>
        </svg>
    );
}


const StyledInput = ({ searchQuery, searchArea }) => {
    const state = useContext(NewSlugStore.State)
    const [pressed, setPressed] = useState(false)

    const handlePress = () => {
        setPressed(pressed ? false : true);
    };

    useEffect(() => {
        // set to unpressed when user focusses away from the dialog
        if(!searchQuery.length && !searchArea.length) {
            setPressed(false); 
        }
    }, [searchArea, searchQuery]);

    return (
       <input placeholder="search..." style={{ width: '200px', border: 'thin solid black', borderRadius: '5px' }}>
           <AccessibleIcon label={`Searchbar`}>
               <MagnifyingGlassIcon />
           </AccessibleIcon>
           <Text>{searchQuery}</Text>
       </input>
    );
}

const SearchBar = () => {
    const [session, loading] = useSession()
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchArea, setSearchArea] = useState([])

    const updateResults = (updatedResultsArr) => {
        dispatch({
            type: 'search_results',
            payload: {
                results: updatedResultsArr
            }
        }); 
    }

    const handlePopoverClosure = () => {
        setSearchQuery('')
        setSearchArea([])
    }
    
    let email = session && session?.user && !loading ? session.user.email : ''
    const { clickstream, isLoading, isError } = useUserClickstream(email);

    useEffect(() => {
        if(!isLoading && !isError && clickstream && !searchArea.length) {
            let temp = [];
            let clickstreamArr = Object.values(clickstream)
            clickstreamArr.map(function(click, index) {
                let clickInfo = JSON.parse(click)
                temp.push({
                    slug: clickInfo.slug,
                    url: clickInfo.url,
                    ttl: clickInfo.config.ttl,
                    blacklist: clickInfo.config.blacklist,
                    routingStatus: clickInfo.config.routingStatus,
                    password: clickInfo.config.password,
                    seoTags: clickInfo.config.seoTags,
                });
            });
            setSearchArea([...temp]); 
        }
    }, [clickstream, isLoading, isError, searchArea]);


    if(loading || isLoading) return <Loader />
    if(isError) return <p> Error: {isError.message} </p>

    return (
       
        <Popover>
            <PopoverTrigger as={IconButton}>
                <StyledInput 
                    searchQuery={searchQuery} 
                    searchArea={searchArea}
                />
            </PopoverTrigger>
        
            <PopoverContent 
                hideArrow={true} 
                onPointerDownOutside={handlePopoverClosure} 
                onEscapeKeyDown={handlePopoverClosure}
            >
                <HorizontalTabs 
                    tabOne={{
                        title: 'Clicks',
                        content: 
                            <div style={{ height: '300px', width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch'}}>
                                <div className="bg-white rounded-md shadow-md">
                                    <Input
                                        type="text"
                                        placeholder="Looking for something?"
                                        onChange={async (e) => {
                                            const { value } = e.currentTarget
                                            setSearchQuery(value)
                                            if(value && value.length && searchArea && searchArea.length) {
                                                let options = {
                                                    includeScore: true,
                                                    keys: ['slug', 'url', 'views', 'ttl'],
                                                };
                                                const Fuse = (await import('fuse.js')).default
                                                const fuse = new Fuse(searchArea, options)

                                                let temp = [];
                                                let results = fuse.search(value)
                                                if(results && results.length) {
                                                    results.map(function(value, index) {
                                                        temp.push({ 
                                                            slug: value.item.slug, 
                                                            url: value.item.url,
                                                            ttl: value.ttl,
                                                            index: value.refIndex,
                                                            score: value.score,
                                                        }); 
                                                    });
                                                    updateResults(temp.sort((a, b) => b.score - a.score)); 
                                                } else {
                                                    updateResults([])
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div style={{ marginTop: '5px', width: '100%' }}>
                                    <ScrollView  
                                        content={
                                                !state.searchbar.results?.length 
                                              ? searchQuery.length ? <NoSearchResults cause="No links or clicks match your query" />  
                                              : <NoSearchResults cause="No query yet you dum dum" /> : 
                                              <div>
                                                { state.searchbar.results.map(function(click, index) { 
                                                    let clickPercentage = click.score * 100
                                                    return (
                                                        <Box css={{ width: '95%', height: '40px', border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
                                                            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                                                                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                                                                    <div className="text-xs font-extralight text-black"> 
                                                                        {ellipses(click.slug, 40)}
                                                                    </div>
                                                                    <div className="text-xs font-extralight text-gray-600">
                                                                        {ellipses(click.url, 50)}
                                                                    </div>
                                                                </Flex>

                                                                <div className={clickPercentage > 50 ? 'text-sm font-extralight text-green-500' : clickPercentage > 25 ? 'text-sm font-extralight text-yellow-500' : 'text-sm font-extralight text-red-500'}>
                                                                    {Math.round(clickPercentage)}%
                                                                </div>
                                                            </Flex>
                                                        </Box>
                                                    );
                                                })}
                                            </div>
                                        }
                                    />
                                    <p style={{ marginTop: '5px', paddingTop: '5px', paddingBottom: '5px', borderTop: 'thin solid black', backgroundColor: '#efefef'}}>
                                        <span className="text-sm font-extralight">
                                            Fuzzy search found {state.searchbar.results.length} results
                                        </span>
                                    </p>
                                </div>
                            </div>
                        }}
                    tabTwo={{
                        title: 'Links',
                        content:
                            <>
                                <p> {JSON.stringify(state.searchbar)} </p>
                            </>
                    }}
                />
            </PopoverContent>

        </Popover>
    )
}

export default SearchBar

