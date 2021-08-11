import React from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from '../Loader'
import { Text } from '../../primitives/Text'
import Trend from 'react-trend'


const useClickstreamBySlug = (slug) => {
    const { data, error } =  useSWR(slug?.length ? `/api/clicks/bySlug/${slug}` : null)

    return {
        data: data || {}, 
        loading: !data && !error,
        error
    };
}

const EmptySlugClickstream = () => {
    return <Text> No clicks to show </Text>
}

const SlugClickstreamSkeleton = () => {
    return (       
        <LoadingSpinner /> 
    );
}

const SlugClickstream = ({ slug }) => {
    const { data, loading, error } = useClickstreamBySlug(slug);

    if(loading) return <SlugClickstreamSkeleton />
    if(!data.clicks || error) return <EmptySlugClickstream />

    let trendlineData = [];
    Object.values(data.freqs).map(function(trend, idx) {
        trendlineData.push(trend);
    });

    return  ( 
        <>
            <Trend data={[120, 149, 193.4, 200, 92]} />
            <Text> {trendlineData} </Text>
        </>
    );
}

export default SlugClickstream