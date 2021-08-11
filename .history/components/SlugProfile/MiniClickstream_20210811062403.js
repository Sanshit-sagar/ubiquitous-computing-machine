import React from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from '../Loader'
import { Text } from '../../primitives/Text'
import Trend from 'react-trend'


export const useClickstreamBySlug = (slug) => {
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
    let trendlineData = [];

    if(loading) return <SlugClickstreamSkeleton />
    if(!data.clicks || error) {
        [0,0,0,0,0,0,0].map(function(value, index) {
            trendlineData.push(0);
    })} else {

        let temp = [...Object.values(data.freqs).reverse()]; 
        temp.map(function(trend, idx) {
                trendlineData.push(trend);
        }); 
    }

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