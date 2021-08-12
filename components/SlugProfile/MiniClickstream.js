import React from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from '../Loader'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import Trend from 'react-trend'


export const useClickstreamBySlug = (slug) => {
    const { data, error } =  useSWR(slug?.length ? `/api/clicks/bySlug/${slug}` : null)

    return {
        data: data || {}, 
        loading: !data && !error,
        error
    };
}

const SlugClickstreamSkeleton = () => {
    return (      
        <Box css={{ padding: '$2', width: '150px', height: '40px', overflowY: 'hidden', overflowX: 'hidden'  }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'center'}}>
                <LoadingSpinner /> 
            </Flex>
        </Box> 
    );
}

const SlugClickstream = ({ value }) => {
    const { data, loading, error } = useClickstreamBySlug(value);
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