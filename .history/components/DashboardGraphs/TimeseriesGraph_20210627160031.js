import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useSession } from 'next-auth/client'

import Loader from '../Loader'
import Modal from '../../buildingBlocks/Modal'

const fetcher = url => axios.get(url).then(res => res.data);

// const useUserSummarizedData = (uid) => {
//     const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

//     return {
//         userData: data ? data.views : null,
//         userDataLoading: !data && !error,
//         userDataError: error
//     }
// }


function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, error } = useSWR(email && email?.length ? `/api/stream/users/${email}?time=${time}` : null, fetcher)

    return {
        clickstream: data || [],
        loading: !data && !error,
        error: error
    };
}

const TimeseriesGraph = () => {
    const [session, sessionLoading] = useSession()

    const [showModal, setShowModal] = useState(false)
    const [timeFilter, setTimeFilter] = useState(30)
    const [reval, setReval] = useState(0)

    const email = session && session?.user && !loading ? session.user.email : ''
    const { clickstream, loading, error } = useUserClickstreams(email, timeFilter)

    // useEffect(() => {
    //     if(!loading && !error && clickstream && clickstream.length) {
    //         let pageview = 0;
    //         let users = new Set();
    //         let countries = new Map();
    //         let paths = new Map();

    //         let date = new Date();
    //         const hash = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            
    //         clickstream.forEach(function(value, index) {
    //             let country = value['cf-ipcountry']
    //             let 


    //                 let freq = countries.get(value[1]) || 0;
    //                 countries.set(value[1], freq + 1); 
    //             } 
    //             else if(value[0])
    //         })

    //     }


    //     if(clickstream && clickstream.length && !loading && !error) {
    //         setReval(reval + 1)

    //         let tempClicks = []; 
    //         clickstream.forEach((click, index) => {
    //             tempClicks.push(click)
    //         });


    //         setSortedClicks(tempClicks.sort((a, b) => String(b.timestamp).localeCompare(a.timestamp)));
    //     }
    // }, [mounted, clickstream, clicksOnPage, loading, error, reval]);
  
    return (
        <div className="w-auto min-w-100 ml-2 bg-gray-700 rounded-md shadow-lg">
            <span className="bg-white text-sm font-extralight"> 
                {JSON.stringify(clickstream)} 
            </span>
        </div>
    )
}

export default TimeseriesGraph