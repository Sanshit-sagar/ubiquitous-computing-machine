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
}

interface IResultItemProps {
    click: any;
    index: number;
};

const ScrollableResults:React.FC<IResultsListProps> = ({ searchQuery }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <Box css={{ border: '1.5px solid black', padding: '5px', borderRadius: '5px', backgroundColor: 'white' }}>
            <ScrollView   
                content={ 
                      !state.searchbar.results?.length || searchQuery?.length 
                    ? <NoSearchResults cause="No links or clicks match your query" action={null} name={null} icon={null}  />  
                    : <div>
                        {state.searchbar.results.map(function(click, index) { 
                            return (
                                <ResultItem click={click} index={index} />
                            );
                        })}
                    </div>
                }
                areaHeight={400}
                areaWidth={400}
            />
            <ResultsSummary />
        </Box>
    );
}

const ResultItem:React.FC<IResultItemProps> = ({ click, index }) => {
    let clickPercentage = click.score * 100

    return (
        <Box css={{ width: '95%',  border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                <Box css={{ margin: '$1', padding: '$2' }}>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        <Text> {ellipses(click.slug, 40)} </Text>
                        <Text> {ellipses(click.url, 50)} </Text>
                    </Flex>
                </Box>

                <Text css={{color: clickPercentage > 50 ? 'green' : 'red'}}>
                   {Math.round(clickPercentage)}%
                </Text>
            </Flex>
        </Box>
    )
}

const ResultsSummary = () => {
    const state = useContext(NewSlugStore.State)

    return (
        <Box css={{ mt: '5px', pt: '5px', pb: '5px', bc: '#efefef', border: 'thin solid black' }}>
            <Text>
                Fuzzy search found {state.searchbar.results.length} results in TODO ms
            </Text>
        </Box>
    );
}

export default ScrollableResults;
