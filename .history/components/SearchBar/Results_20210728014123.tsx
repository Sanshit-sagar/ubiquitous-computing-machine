import React, { useContext } from 'react'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { ellipses } from '../../lib/utils'
import NoSearchResults from '../EmptyStates/NoSearchResults'
import ScrollView from '../../primitives/ScrollView'
import { NewSlugStore } from '../../store'

interface IResultsListProps {
    searchQuery: string;
    searchResults: any[]; 
}

interface IResultItemProps {
    index: number;
};

const ScrollableResults:React.FC<IResultsListProps> = ({ searchQuery, searchResults }) => {
    const state = useContext(NewSlugStore.State)

    if(!state.searchbar.results?.length || !searchQuery?.length) {
        return (
            <NoSearchResults cause="No links or clicks match your query" />
        )
    }

    return (
        <ScrollView   
            content={ 
                <Box css={{ width: '97.5%', mt: '$1', mb: '$2' }}>
                    {state.searchbar.results.map(function(click, index) { 
                        return (
                            <ResultItem index={index} />
                        );
                    })}
                </Box>
            }
        />
    );
}

const ResultItem:React.FC<IResultItemProps> = ({ index }) => {
    const state = useContext(NewSlugStore.State)
    
    if(index < 0 || !state.searchbar.results?.length || state.searchbar.results.length < index) {
        return null; 
    } 

    return (
        <Box css={{ border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                <Box css={{ padding: '$1' }}>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        <Text> {ellipses(state.searchbar.results[index].slug, 40)} </Text>
                        <Text> {ellipses(state.searchbar.results[index].url, 20)} </Text>
                    </Flex>
                </Box>

                <Text css={{color: state.searchbar.results[index].score > .5 ? 'green' : 'red'}}>
                   {Math.round(state.searchbar.results[index].score * 100)}%
                </Text>
            </Flex>
        </Box>
    )
}

export default ScrollableResults;
