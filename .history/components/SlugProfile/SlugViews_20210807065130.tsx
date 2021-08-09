import React from 'react';
import { useSession } from 'next-auth/client'

import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import Loader from '../Loader'
import useSWR from 'swr'
import StyledSeparator from '../../primitives/Separator'

import { styled } from '@stitches/react';
import { indigo, mauve, blackA } from '@radix-ui/colors'

const SlugViewsContainer = styled('div', {
    backgroundColor: 'white',
    color: blackA.blackA12,
    border: 'thin solid transparent', 
    borderRadius: '5px',
    margin: '$1',
    padding: '$1 $2',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'stretch'
});

const IndividiualSlugStatistic = styled('div', {
    backgroundColor: 'white',
    color: mauve.mauve12,
    height: '100%',
    width: '100%',
    border: 'thin solid silver',
    borderRadius: '$3',
    padding: '$2',
    marginRight: '$1',
    fontSize: 18,
    '&:hover': {
        backgroundColor: mauve.mauve3,
        borderColor: mauve.mauve12,
    },
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'flex-end', 
    alignItems: 'stretch'
})

const StatisticalValue = styled('span', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    lineHeight: 1,
    padding: '$1',
    margin: '$1',
    color: indigo.indigo12
});

const StatisticalLabel = styled('span', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '$1 $2',
    margin: '$1',
    fontSize: 14,
    lineHeight: 1,
    color: blackA.blackA12,
})

export const useViewsBySlug = ({ slug }) => {
    const [session, loading] = useSession()

    let email = session && session?.user ? session.user.email : ''
    const { data, error } = useSWR(email?.length && slug?.length ? `/api/stream/slugs/${slug}?email=${email}` : null)

    return {
        views: data ? data.views : undefined,
        loading: !data && !error,
        error: error
    }
}

const LabelledStatistic = ({ name, value }) => {
    return (
        <IndividiualSlugStatistic>
            <StatisticalValue>{value}</StatisticalValue>
            <StyledSeparator orientation="horizontal" />
            <StatisticalLabel>{name}</StatisticalLabel>
        </IndividiualSlugStatistic>
    ); 
}

export const SlugViews = ({ slug }) => {
    const { views, loading, error } = useViewsBySlug({ slug }); 

    if(loading) return <Loader />;
    if(error) return <p> error! </p>;

    return (
        <SlugViewsContainer>
            <LabelledStatistic name={'Total'} value={views.total} />
            <LabelledStatistic name={'Unique'} value={views.unique} />
            <LabelledStatistic name={'Daily'} value={views.daily} />
        </SlugViewsContainer>
    ); 
}
