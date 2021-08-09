import React, { useRef } from 'react'
import { useSession } from 'next-auth/client'

import { useSlugDetails } from '../../hooks/slugQueries'
import { SlugViewsCell } from '../SortedStatModal/columns'
import { getLocaleTimestring, getDateString } from '../../lib/datetime'

import Loader from '../Loader'

import ActiveLink  from '../../primitives/ActiveLink'
import StyledSeparator from '../../primitives/Separator'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

const ActivelyLinkedUrl = ({ details }) => {
    const ref = useRef(null);

    return (
        <ActiveLink 
            href={details.url}
            ref={ref}
            children={
                <Text as={'div'}> 
                    {details.url} 
                </Text>
            }
        />
    );
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

const SlugDetails = ({ slug }) => {
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
                        <> {
                                  details?.url  ? <ActivelyLinkedUrl details={details} /> 
                                : null 
                            }
                        </>
                    </div> 

                    <div style={{ padding: '3.5px', border: 'thin solid black', borderRadius: '5px' }}>
                        <SlugViewsCell 
                            slug={slug} 
                            email={session.user.email} 
                        />
                    </div>
                </div>
                <div> 
                    <SlugConfig config={details} />
                </div>
            </Flex>
        </Box>
    );
}

export default SlugDetails