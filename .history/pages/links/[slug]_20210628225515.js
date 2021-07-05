import React from 'react'

import useSWR from 'swr'
import { useRouter } from 'next/router'

import StackedLayout from '../../sections/StackedLayout'
import Loader from '../../components/Loader'
import { Card, CardBody } from '@windmill/react-ui'


const fetcher = url => axios.get(url).then(res => res.data);

const useSlugDetails = (slug) => {
    const {data, error} = useSWR(`/api/slugs/${slug}`, fetcher);

    return {
        details: data ? data.details : null,
        loading: !data && !error,
        error: error
    }; 
}

const SlugFields = ({ slug }) => {
    const { details, loading, error } = useSlugDetails(slug)

    if(loading) return <Loader />
    if(error) return <p> error! </p>

    return (
        // <Windmill dark>
        <Card className="flex h-48 w-30">
            <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                    {details ? details.slug : null}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400">
                    {details ? details.url : null}
                </p>

                <p className="text-gray-600 dark:text-gray-400">
                    {details ? details.ttl : null}
                </p>

                <p className="text-gray-600 dark:text-gray-400"> 
                    {details ? details.timestamp : null} 
                </p>
            </CardBody>
        </Card>
        // </Windmill>
    )
}

const SlugInfo = () => {
    const router = useRouter()

    const givenSlug = router.query.slug

    return (
        <StackedLayout 
            children={<SlugFields slug={givenSlug} />} 
            
        />
    );
}

export default SlugInfo