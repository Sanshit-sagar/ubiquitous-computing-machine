import React, { useRef } from 'react'
import { useSession } from 'next-auth/client'

import { SlugViews } from './SlugViews'
import { getLocaleTimestring, getDateString } from '../../lib/datetime'

import Loader from '../Loader'

import ActiveLink  from '../../primitives/ActiveLink'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import useSWR from 'swr'

const ActivelyLinkedUrl = ({ url }) => {
    const ref = useRef(null);

    return (
        <ActiveLink 
            href={url}
            ref={ref}
            children={
                <Text> {url} </Text>
            } 
        />
    );
}

export const useSlugDetails = (slug) => {
    const { data, error } =  useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);

    return {
        details: data ? data.details : null,
        loading: !data && !error,
        error
    }; 
}

const SlugConfig = ({ details }) => {

    if(!details) return <p> no details to show! </p>

    return (
        <Box style={{ width: '325px' }}>
            <Flex style={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}> 
                <Text as={'div'}> 
                    {     details.config?.ttl?.length 
                       ? `${getLocaleTimestring(parseInt(details.config?.ttl))}${getDateString(parseInt(details.config?.ttl))}` 
                       : '-' 
                    } 
                </Text> 
            </Flex>

            <Flex style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}> 
                <Text as={'div'}> 
                    {details?.config?.routingStatus ? `HTTP Status: ${details.config?.routingStatus}` : `N/A`} 
                </Text> 
            </Flex> 

            
            <Text as={'div'}> 
                {details?.config?.password || 'N/A'} 
            </Text> 
        </Box>
    )
}

const SlugDetailsSkeleton = () => {
    return <Loader /> 
}

const SlugDetails = ({ slug }) => {
    const [session, userLoading] = useSession()
    const { details, loading, error } = useSlugDetails(slug);

   
    if(loading) return <SlugDetailsSkeleton />
    if(error || !slug) return <Text> Error: {error?.message || 'No slug found'} </Text>


    return (
        <Box css={{ width: '100%', margin: '3.5px' }}>
            <Flex direction="column">
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '5px 7.5px' }}>
                        <>{details?.url  ? <ActivelyLinkedUrl url={details.url} /> : <Loader />}</>
                    </div> 

                    <div style={{ padding: '3.5px', border: 'thin solid black', borderRadius: '5px' }}>
                        <SlugViews slug={slug} />
                    </div>
                </div>
                <div> 
                    {details?.url ? <SlugConfig details={details} /> : <Loader />}
                </div>
            </Flex>
        </Box>
    );
}

export default SlugDetails