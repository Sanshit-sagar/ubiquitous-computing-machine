import React from 'react'

import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useRouter } from 'next/router'

import StackedLayout from '../../sections/StackedLayout'
import Loader from '../../components/Loader'


const useSlugDetails = (slug) => {
    const {data, error} = useSWR(`api/slugs/${slug}`, fetcher);

    return {
        info: data,
        loading: !data && !error,
        error
    }; 
}

const SlugFields = ({ slug }) => {
    const { info, loading, error } = useSlugDetails(slug)

    if(loading) return <Loader />;
    if(error) return <p> Error! </p>;

    return (
        <div>
            <p> {JSON.stringify(info)} </p>
        </div>
    )
}

const SlugInfo = () => {
    const router = useRouter()
    const givenSlug = router.query.slug.substring(7)

    return (
        <StackedLayout children={
            <div className="bg-white px-4 py-5 border-b border-gray-200">
                <SlugFields slug={givenSlug} /> 
            </div>}
        />
    );
}

export default SlugInfo