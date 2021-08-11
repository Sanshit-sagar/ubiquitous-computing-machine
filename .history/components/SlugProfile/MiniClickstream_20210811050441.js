import React from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from '../Loader'
import { Text } from '../../primitives/Text'
import Trendline from 'react-trend'


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
    let temp = [...Object.values(data.freqs).reverse()]; 
    temp.map(function(trend, idx) {
        trendlineData.push(trend);
    });

    return (
        <Trend
            smooth
            autoDraw
            autoDrawDuration={3000}
            autoDrawEasing="ease-out"
            data={trendlineData} 
            gradient={['#f72047', '#ffd200', '#1feaea']}
            radius={10}
            strokeWidth={2}
            strokeLinecap={'butt'}
        />
    );
}

export default SlugClickstream