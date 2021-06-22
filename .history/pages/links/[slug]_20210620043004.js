import React from 'react'

import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useRouter } from 'next/router'

import Info from '@supabase/ui'

import StackedLayout from '../../sections/StackedLayout'

const SlugSkeleton = () => {

    return (
        <>   
            <div class="w-full h-full">
                <div class="h-6 w-full rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                <div class="grid w-full grid-cols-4 gap-1">
                    <div class="w-full col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    <div class="w-full h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                    <div class="w-full col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    <div class="w-full col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                    <div class="h-4 w-full rounded-sm bg-gray-200 animate-pulse"></div>
                    <div class="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    <div class="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                    <div class="h-4 w-full rounded-sm bg-gray-200 animate-pulse"></div>
                </div>
            </div>
       </>
    )
}


const useSlugDetails = (slug) => {
    const {data, error} = useSWR(`api/slug/details/${slug}`, fetcher);

    return {
        info: data,
        loading: !data && !error,
        error
    }; 
}

const SlugFields = ({ slug }) => {
    const { info, loading, error } = useSlugDetails(slug)

    if(loading) return <SlugSkeleton />;
    if(error) return <p> Error! </p>;

    return (
        <div>
            {/* <p> {JSON.stringify(info)} </p> */}
            <SlugSkeleton />
        </div>
    )
}

const SlugInfo = () => {
    const router = useRouter();
    const slug = router.query.slug 

    return (
        <StackedLayout>
            <div className="bg-white px-4 py-5 border-b border-gray-200">
                {/* <h1> Showing data for {slug} </h1> */}
                <SlugFields slug={slug} /> 
            </div>
        </StackedLayout>
    );
}

export default SlugInfo