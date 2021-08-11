import React from 'react';
import useSWR from 'swr';

import { Text } from '../../primitives/Text'
import Trend from 'react-trend'


const useClickstreamBySlug = (slug) => {
    const { data, error } =  useSWR(slug?.length ? `/api/clicks/bySlug/${slug}` : null)

    return {
        clicks: data || {},
        loading: !data && !error,
        error
    };
}

const EmptySlugClickstream = () => {
    return <Text> No clicks to show </Text>
}


const SlugClickstream = ({ slug }) => {
    const { clicks, loading, error } = useClickstreamBySlug(slug);

    if(loading) return <LoadingSpinner />
    if(!clicks || error) return <EmptySlugClickstream />

    return  ( 
        <>
            <Trend data={[120, 149, 193.4, 200, 92]} />
            <Text> {JSON.stringify(clicks)} </Text>
        </>
    );
}

export default SlugClickstream