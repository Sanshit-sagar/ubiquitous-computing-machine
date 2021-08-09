import React from 'react';
import { useSession } from 'next-auth/client'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import Loader from '../Loader'

import useSWR from 'swr'

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

export const SlugViewsCell = ({ slug }) => {
    const { views, loading, error } = useViewsBySlug(slug); 

    if(loading) return <Loader />;
    if(error) return <p> error! </p>;

    return (
        <Box css={{ height: '30px' }}>
            <Flex css={{ width: '100%', fd: 'column', jc:'flex-start', ai: 'flex-start'}}>
                <Text> {views.total} total </Text>
                <Text> {views.unique} unique </Text> 
            </Flex>
        </Box>
    ); 
}
