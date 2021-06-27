
import React, { useState } from 'react'
import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import useSWR from 'swr'
import axios from 'axios'
import Loader from '../Loader';
import { useSession } from 'next-auth/client'

import PieChart from '../Charts/PieChart'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from '@windmill/react-ui'

const fetcher = url => axios.get(url).then(res => res.data);

function sanitize(text) {
    if(!text) return '';
    return (text.length > 50) ? `${text.substring(0, 50)}...` : text || '';
}

// const aggregateStats = (clickstream) => {
//     let ips = {}
//     let countries = {}
//     let destinations = {}
//     let skipped = 0;
//     let count = 0; 

//     clickstream.forEach(click => {
//         const ip = click.visitor ? click.visitor.ip : click.user ? click.user.ip : ''
//         const country = click.geodata ? click.geodata.country : click.geo ? click.geo.country : ''
//         // const destination = visitor.destination || ''
//         const destination = click.visitor ? click.visitor.system : click.user ? click.user.system : click.system ? click.system : ''

//         if(!ip.length || !country.length || !destination.length) {
//             ++skipped
//         } else {
//             const ipFreq = ips[ip] || 0
//             const countryFreq = countries[country] || 0 
//             const destFreq = destinations[destination] || 0
            
//             ips[ip] = ipFreq + 1
//             countries[country] = countryFreq + 1
//             destinations[destination] = destFreq + 1
//         }
//         ++count
//     });
//     var sortedCountries = Object.entries(countries).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 
//     var sortedDestinations = Object.entries(destinations).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 
//     var sortedIps = Object.entries(ips).sort((a, b) => destinations[a[1]] - destinations[b[1]]); 

//     return { sortedCountries, sortedIps, sortedDestinations, skipped, count }
// }


// function useUserClickstreams(email, timeFilter)  {
//     const time = timeFilter || '30'
//     const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

//     return {
//         clickstream: data ? data.clickstream : [],
//         loading: !data && !err,
//         error: err
//     };
// }


const CustomSortedTable = ({ loading, sortedData, title }) => {
    
    var arr = [];
    let sortedSlugArr = []; 

    if(!loading && sortedData && title) {
        sortedData.forEach(function(value, index) {
            if(index%2==1) {
                arr.push({
                    slug: sortedData[index-1],
                    frequency: value,
                });
            } else {
                console.log(`skipping: ${value}`)
            }
        });

        sortedSlugArr = arr.sort((a, b) => b.frequency - a.frequency)
    }

    return (
        <div className="w-auto min-w-100">
            <TableContainer className="w-100 bg-gray-700  rounded-md shadow-lg p-1 mr-2 mb-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell> {loading ? <Loader /> : title} </TableCell>
                            <TableCell> {loading ? <Loader /> : 'Visits'} </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedSlugArr.map((datum, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell> 
                                        <span className="w-100 text-md text-black font-extralight p-0 m-0">
                                            {loading ? <Loader /> : sanitize(datum.slug)}     
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="w-100 text-md text-black font-extralight p-0 m-0">
                                            {loading ? <Loader /> : datum.frequency} 
                                        </span>    
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const CustomSortedGraphic = ({ sortedData, title }) => {
    
    return (
        <div className="container mx-auto mt-4 p-2 bg-gray-600 rounded-md shadow-lg text-white">
            {/* <span className="text-md">
                {JSON.stringify(sortedData)}
            </span> */}
            <PieChart />
        </div>
    )
}

const useClickstreamTimeseries = (email) => {
    const { data, error } = useSWR(email && email?.length ? `/api/slugs/user-views/${email}` : null, fetcher); 
    
    return {
        data: data ? { 
            topSlugs: data.slugsSortedByViews, 
            topDestinations: data.viewsSortedByTime 
        } : {},
        loading: !data && !error,
        error
    }
}

const TimeseriesList = () => {
    const [session, sessionLoading] = useSession()

    const email = session && session.user ? session.user.email : ''

    const { data, loading, error } = useClickstreamTimeseries(email)

    if(error) return <p> Error!!! </p>

    return (
        <div className="container mx-auto mt-2">
            <CustomSortedTable loading={loading} sortedData={data.topSlugs} title="Most Viewed Slugs"/>
        </div>
    );
}

export default TimeseriesList