import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { ellipses } from '../../lib/utils'

import NoSearchResults from '../Skeletons/NoSearchResults'
import ScrollView from '../../primitives/ScrollView'

const NO_RESULTS_STR = 'No links or clicks match your query';

interface IResultsListProps {
    searchQuery: string;
    searchResults: any[]; 
}

interface IResultItemProps {
    result: any;
};

const ScrollableResults:React.FC<IResultsListProps> = ({ searchQuery, searchResults }) => {
    
    if(!searchResults?.length || !searchQuery?.length) {
        return <NoSearchResults cause={NO_RESULTS_STR} />;
    }

    return (
        <ScrollView   
            content={ 
                <>
                    {searchResults.map(function(result, index) { 
                        return <ResultItem result={result} />;
                    })}
                </>
            }
        />
    );
}

const ResultItem:React.FC<IResultItemProps> = ({ result }) => {
   
    let similarityColor = result.score > .5 ? 'green' : 'red';

    return (
        <Box css={{ border: 'thin solid black', br: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                <Box css={{ padding: '$1' }}>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        <Text> {ellipses(result.slug, 40)} </Text>
                        <Text> {ellipses(result.url, 20)} </Text>
                    </Flex>
                </Box>

                <Text css={{ color: `${similarityColor}` }}>
                   {Math.round(result.score * 100)}%
                </Text>
            </Flex>
        </Box>
    )
}

export default ScrollableResults;
