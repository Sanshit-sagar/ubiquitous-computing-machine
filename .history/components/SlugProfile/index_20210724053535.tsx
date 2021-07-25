import React from 'react'
import { useSession } from 'next-auth/client'

import { useSlugDetails } from '../../hooks/slugQueries'
import { SlugViewsCell } from '../SortedStatModal/columns'
import { getLocaleTimestring, getDateString } from '../../lib/datetime'

import Loader from '../Loader'
import ActiveLink from '../../primitives/ActiveLink'
import StyledSeparator from '../../primitives/Separator'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

const ActivelyLinkedUrl = ({ details }) => {
    return (
        <ActiveLink 
            href={details.url} 
            ref={details.url}
        >
            <Text> {details.url} </Text>
        </ActiveLink>
    )
}

const SlugProfile = ({ slug }) => {
    const [session, sessionLoading] = useSession()
    const { details, loading, error } = useSlugDetails(slug);

    if(error || (!session && !sessionLoading)) {
        return (
            <span className="text-sm font-extralight"> 
                Error: {error.message} 
            </span>
        );
    }
    

    return (
        <Box css={{ width: '100%', margin: '3.5px' }}>
            <Flex direction="column">
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '5px 7.5px' }}>
                        <> {details.url ? <ActivelyLinkedUrl details={details} /> : null} </>
                    </div> 

                    <div style={{ padding: '3.5px', border: 'thin solid black', borderRadius: '5px' }}>
                        <SlugViewsCell slug={slug} email={session.user.email} />
                    </div>
                </div>

                <StyledSeparator css={{ margin: '15px 0' }} />

                <div className="text-xs font-extralight">
                    {   
                        loading ? <Loader /> : details && Object.entries(details)?.length ?
                        <span style={{ width: '375px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                           
                            <span style={{ width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}> 
                               <Text> Expiration: </Text> 
                               <Text>
                                    {details.config?.ttl && details.config.ttl.length ? 
                                        `${getLocaleTimestring(parseInt(details.config.ttl))}, ${getDateString(parseInt(details.config.ttl))}`
                                    : '-'} 
                                </Text> 
                            </span>

                            <span style={{ width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}> 
                               <Text> HTTP Status: </Text> 
                               <Text> {details.config.routingStatus || 'N/A'} </Text> 
                            </span>

                            <div style={{ width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}> 
                                <Text> Password: </Text> 
                                <Text> {details.config.password || 'N/A'} </Text> 
                            </div>
                           
                        </span>
                        : <Text> Error: Slug doesnt exist </Text>
                    }
                </div>
            </Flex>
        </Box>
    );
}

export default SlugProfile