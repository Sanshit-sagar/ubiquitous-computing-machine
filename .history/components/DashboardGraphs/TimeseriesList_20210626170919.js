
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


const CustomSortedTable = ({ sortedData, title }) => {

    return (
        <div className="w-auto bg-white">
            <span className="text-black font-extralight">
                {JSON.stringify(sortedData)}
            </span>
            {/* <TableContainer className="bg-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell> {title} </TableCell>
                            <TableCell> Visits </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(sortedData).map((datum, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell> 
                                        <span className="w-32 text-md text-black font-extralight p-0 m-0">
                                            {sanitize(datum[1][0])}     
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-md text-black font-extralight p-0 m-0">
                                            {datum[1][1]} 
                                        </span>    
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer> */}
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

const TimeseriesList = () => {
    const [session, sessionLoading] = useSession()

    const time = '30';
    const email = session && session.user ? session.user.email : ''

    // const {clickstream, loading, error} = useUserClickstreams(email, time) 
    const { data, error } = useSWR(`/api/slugs/user-views/${email}`, fetcher); 

    if(!data && !error) return <Loader />
    if(error) return <p> Error! </p>

    // let topCountries = aggregateStats(clickstream).sortedCountries.slice(0, 5)
    // let topDestinations = aggregateStats(clickstream).sortedDestinations.slice(0, 5)
    // let topIps = aggregateStats(clickstream).sortedIps.slice(0, 5)
    let topSlugs = data.slugsSortedByViews

    return (
        <div className="container mx-auto mt-2">
            <CustomSortedTable sortedData={topSlugs} title="Most Viewed Slugs" />
            {/* <CustomSortedGraphic sortedData={topDestinations} title="Destination URLs" /> */}
            <div className="container h-full w-full m-2 p-2 shadow-lg">
                <PieChart sortedData={topSlugs} title="Top Destination URLs"/> 
            </div>
            {/* <p> {JSON.stringify(topDestinations)} </p> */}
        </div>
    );
}

export default TimeseriesList