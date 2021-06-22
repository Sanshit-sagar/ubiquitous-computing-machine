import React from 'react'

import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useRouter } from 'next/router'

import StackedLayout from '../../sections/StackedLayout'

const useSlugInfo = (slug) => {
    const {data, error} = useSWR(`api/slug/details/${slug}`, fetcher);

    return {
        info: data,
        loading: !data && !error,
        error
    }; 
}

const SlugInformation = ({ slug }) => {
    const { info, loading, error } = useSlugInfo(slug)

    if(loading) return <Info loading={true} />;
    if(error) return <p> Error! </p>;

    return (
        <div>
            <p> {JSON.stringify(info)} </p>
        </div>
    )
}

const SlugInfo = () => {
    const router = useRouter();
    const slug = router.query.slug 

    return (
        <StackedLayout>
            <div className="bg-white px-4 py-5 border-b border-gray-200">
                <h1> Showing data for {slug} </h1>
                <SlugInformation slug={slug} /> 
            </div>
        </StackedLayout>
    );
}

export default SlugInfo