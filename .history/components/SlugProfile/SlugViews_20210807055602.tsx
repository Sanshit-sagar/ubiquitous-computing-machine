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
    width: '100px',
});

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
            <Flex css={{ fd: 'column', jc:'flex-start', ai: 'center' }}>
                <Text> {views.total} total </Text>
                <Text> {views.unique} unique </Text> 
                <Text> {views.daily} today </Text>
            </Flex>
        </SlugViewsContainer>
    ); 
}
