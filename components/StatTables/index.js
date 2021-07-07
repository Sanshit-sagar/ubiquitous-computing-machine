import React, { useState, useEffect, useContext } from 'react'
import { Card, Typography, Button, Badge, IconDatabase, IconPieChart } from '@supabase/ui'
import { TableContainer, Table, TableHeader, TableBody, TableRow, TableCell  } from '@windmill/react-ui'
import aggregateStats from '../../lib/statistics'

import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'

import axios from 'axios'
import useSWR from 'swr'
import Loader from '../Loader'

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}

const DataTable = ({ title, variable, data, loading, width }) => {
    const [displayingTable, setDisplayingTable] = useState(true)

    const toggleMode = () => {
        setDisplayingTable(!displayingTable)
    }

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell className="text-sm font-extralight"> {variable} </TableCell>
                        <TableCell className="text-sm font-extralight"> Visits </TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data && data.length &&
                        data.map(function(value, index) {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-sm font-extralight"> 
                                    {loading ? <Loader /> 
                                    : `${value[0].substring(0, 30)}${value[0].length >= 30 ? '...' : ''}`}
                                    </TableCell>
                                    <TableCell className="text-sm font-extralight"> 
                                        {loading ? <Loader /> : value[1]}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useAggregatedUserAgentStats = (email, userAgents) => {
    const { data, error } =  useSWR(email && email.length && userAgents && userAgents.length ? `/api/user-agent/aggregate/${email}?userAgents=${userAgents}` : null, fetcher)

    return {
        sua: data ? data.sua : null,
        suaLoading: !data && !error, 
        suaError: error
    }
}

const useTimeseries = (email) => {

    const { data, error } =  useSWR(email && email.length ? `/api/stream/statistics/${email}` : null, fetcher);

    return {
        start: data ? data.earliestEvent : null,
        end: data ? data.latestEvent : null,
        max: data ? data.max : null, 
        maxIndex: data ? data.maxIndex : null,
        freqs: data && data.freqs ? Object.entries(data.freqs).sort((a, b) => data.freqs[b[0]] - data.freqs[a[0]]).splice(0, 5) : null,
        skipped: data ? data.skipped : null,
        count: data ? data.count : null,
        average: data ? data.average : null,
        loading: !data && !error,
        error
    };
}
// tlsVersions, httpProtocols, hours of the day, days of the month/week

const DataVisualizer = ({ data, title, type }) => {

    return (
        <div className="text-md font-extralight"> 
           
           {type==='pie' ?
                <PieChart 
                    sortedData={data} 
                    title={title} 
                    type={type} 
                /> 
                : <BarChart 
                    sortedData={data} 
                    title={title} 
                    type={type} 
                />
            }
        </div>
    )
}

const StatTables = ({ email }) => {
    const { clickstream, loading, error } = useUserClickstreams(email)
    const { sortedCountries, sortedIps, sortedDestinations, sortedUserAgents, userAgents } = aggregateStats(clickstream)
    const { sua, suaLoading, suaError } = useAggregatedUserAgentStats(email, Object.keys(userAgents))
    const { start, end, max, maxIndex, freqs, average, tsLoading, tsError }  = useTimeseries(email)

    const [index, setIndex] = useState(0)
    const [graphType, setGraphType] = useState('bar')

    const finalizedData = [
        { index: '0', title: 'Top Destinations', variable: 'destinations', stat: sortedDestinations.splice(0, 5), width: '400px', loading: loading },
        { index: '1', title: 'Top Dates', variable: 'Dates', stat: freqs || [], width: '400px', loading: suaLoading || loading },
        { index: '2', title: 'Top Countries', variable: 'country', stat: sortedCountries.splice(0, 5), width: '400px', loading: loading },
        { index: '3', title: 'Top IP Addresses', variable: 'ip', stat: sortedIps.splice(0, 5), width: '400px', loading: loading},
        { index: '4', title: 'Top Operating Systems', variable: 'Operating Systems', stat: sua && Object.entries(sua.sortedOsNames) || [], width: '400px', loading: loading || suaLoading },
        { index: '5', title: 'Top Browsers', variable: 'Web Browsers', stat:  sua && Object.entries(sua.sortedBrowsers) || [], width: '400px',  loading: loading || suaLoading },
        { index: '6', title: 'Top Engines', variable: 'Engines', stat:  sua && Object.entries(sua.sortedEngines) || [], width: '400px',  loading: loading || suaLoading },
    ];

    if(error || suaError || tsError) {
        return <p> Error! `${error ? error.message : suaError ? suaError.message : tsError.message}` </p>
    }

    return (
        <Card style={{ 
            minWidth: '850px', minHeight: '375px', borderRadius: '5px', padding: '0px', display: 'flex',
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'
        }}>
            <Card.Meta 
                title={
                    <div className="w-full inline-flex justify-between align"> 
                        <Typography.Title level={4}> 
                            {finalizedData[index].title}
                        </Typography.Title>
                        <Button 
                            size="small" 
                            type="outline"
                            icon={<IconDatabase />}
                            onClick={() => {
                                toggleMode()
                                setGraphType('database')
                            }}
                        />
                        <Button 
                            size="small" 
                            type="outline" 
                            icon={<IconPieChart />} 
                            onClick={() => {
                                toggleMode()
                                setGraphType('charts')
                            }}
                        />
                    </div>
                } 
                style={{ marginBottom: '10px' }} 
            />
            <DataTable
                title={finalizedData[index].title}
                variable={finalizedData[index].variable}
                data={finalizedData[index].stat}
                width={finalizedData[index].width}
                loading={finalizedData[index].loading}
            /> 
            <DataVisualizer
                data={finalizedData[index].stat}
                title={finalizedData[index].title}
                type={graphType}
            />
        </Card>
    );
}


export default StatTables