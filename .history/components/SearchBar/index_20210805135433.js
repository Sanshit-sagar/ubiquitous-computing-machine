import React, { useContext, useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'

import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

import Loader from '../Loader'

import ToggleButton from '../../primitives/Toggle'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { TextField } from '../../primitives/TextField'
import { Label } from '../../primitives/LabelledInput'
import { Popover, PopoverContent, PopoverTrigger } from '../../primitives/Popover'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import ScrollableResults from './Results'

const useUserClickstream = (email) => {
    const { data, error } =  useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null)
    
    return {
        clickstream: data ? data.links : null,
        isLoading: !data && !error,
        isError: error
    }
}

const SearchbarButton = () => {
    return (
        <Box css={{ py: '$1', px: '$1', br: '$1', bc: '#fefefe', width: '200px' }}>
            <Flex css={{ fd:'row', jc: 'flex-start', ai: 'center'}}>
                <MagnifyingGlassIcon />
                <Text css={{ ml: '$2' }}> Search... </Text> 
            </Flex>
        </Box>
    )
}


const ResultsSummary = ({ searchResults }) => {
    return (
        <Box css={{ mx: '$1', pt: '$1', pb: '$1' }}>
            <Text>
                 {searchResults.length} results in TODO ms
            </Text>
        </Box>
    );
}

const SearchBar = (props) => {
    const [session, loading] = useSession()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchArea, setSearchArea] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    let {label} = props;
    let ref = useRef();
    let searchState = useSearchFieldState(props);
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props,searchState,ref);
    let {buttonProps} = useButton(clearButtonProps, ref);

    const updateResults = (updatedResultsArr) => {
        setSearchResults([...updatedResultsArr])
    }

    const togglePopoverState = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }

    const preventDefaultHandler = (event) => {
        event.preventDefault(); 
    }

    const handleEscape = (event) => {
        setIsPopoverOpen(false)
    }

    
    let email = session ? session.user?.email : ''
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
        <Popover
            isOpen={isPopoverOpen}
            onOpenChange={(updatedState) => setIsPopoverOpen(updatedState)}
        >
            <PopoverTrigger>
                <Box css={{ mt: '$1' }}>
                    <ToggleButton 
                        isPressed={isPopoverOpen}
                        handlePress={togglePopoverState}
                        pressedElem={<ResultsSummary searchResults={searchResults} />} 
                        unpressedElem={<SearchbarButton />}
                    /> 
                </Box>
            </PopoverTrigger>

            <PopoverContent 
                side="bottom"
                trapFocus={false}
                hideArrow={false} 
                avoidCollisions={true}
                disableOutsidePointerEvents={false}
                onFocusOutside={preventDefaultHandler}
                onEscapeKeyDown={handleEscape}
            >
                <>
                    <Box css={{ border: 'thin solid black', bc: 'white', borderRadius: '5px', mb: '$1' }}>
                        <Label {...labelProps}> {label} </Label>
                        <TextField
                            placeholder="Looking for something?"
                            value={searchQuery}
                            onChange={async (e) => {
                                const { value } = e.currentTarget
                                setSearchQuery(value)
                                if(value && value.length && searchArea && searchArea.length) {
                                    let options = {
                                        includeScore: true,
                                        keys: ['slug'],
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
                                                score: 1-value.score,
                                            }); 
                                        });
                                        updateResults(temp.sort((a, b) => b.score - a.score)); 
                                    } else {
                                        updateResults([])
                                    }
                                }
                            }}
                        />
                    </Box>
                    <ScrollableResults searchQuery={searchQuery} searchResults={searchResults} />    
                </>     
            </PopoverContent>
        </Popover>
    );
}

export default SearchBar

