import React from 'react';
import { useSession } from 'next-auth/client'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import Loader from '../Loader'
import useSWR from 'swr'

import { styled } from '@stitches/react';
import { mauve, blackA } from '@radix-ui/colors'

const SlugViewsContainer = styled('div', {
    backgroundColor: 'white',
    color: blackA.blackA12,
    border: 'thin solid black', 
    borderRadius: '5px',
    height: '100px',
    width: '250px',
    padding: '$1 $2 0 $2',
    margin: '$2'
});

const IndividiualSlugStatistic = styled('div', {
    backgroundColor: 'white',
    color: mauve.mauve12,
    borderRight: 'thin solid black',
    padding: '$1 $2 0 $2',
    fontSize: 18,
    '&:hover': {
        backgroundColor: mauve.mauve12,
        color: 'white',
        borderColor: 'gray',
    },
})


export const useViewsBySlug = ({ slug }) => {
    const [session, loading] = useSession()

    let email = session && session?.user ? session.user.email : ''
    const { data, error } = useSWR(email?.length && slug?.length ? `/api/stream/slugs/${slug}?email=${email}` : null)

    return {
        views: data ? data.views : undefined,
        loading: !data && !error,
        error: error
    }
}

export const SlugViews = ({ slug }) => {
    const { views, loading, error } = useViewsBySlug({ slug }); 

    if(loading) return <Loader />;
    if(error) return <p> error! </p>;

    return (
        <SlugViewsContainer>
            <Flex css={{ fd: 'row', jc:'flex-start', ai: 'center' }}>
                <IndividiualSlugStatistic> {views.total} </IndividiualSlugStatistic>
                <IndividiualSlugStatistic> {views.unique} </IndividiualSlugStatistic> 
                <IndividiualSlugStatistic> {views.daily} </IndividiualSlugStatistic>
            </Flex>
        </SlugViewsContainer>
    ); 
}
