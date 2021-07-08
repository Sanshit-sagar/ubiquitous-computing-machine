import React, { useState, useEffect } from 'react'

import { useSession, getSession } from 'next-auth/client'
import useSWR from 'swr'
import axios from 'axios'

import aggregateStats from '../lib/statistics'
import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email, time)  {
    time = time || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        clickstreamLoading: !data && !err,
        clickstreamError: err
    };
}

const Leaderboards = ({ }) => {
   

    return (
        <StackedLayout
            pageMeta={{
                title: 'Leaderboards',
                description: 'yadiddads'
            }}
            children={
                <LeaderboardTables
                    time={time}
                    email={email} 
                    loading={loading}
                />
            }
        /> 
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if(!session || !session.user?.email) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    const userClickstream = await axios.get(`/api/stream/users/${email}?time=${time}`).then((resp) => {

    }).catch((err) => {
        redirect: {
            return {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    })

    return {
      props: { session }
    }
  }

export default Leaderboards