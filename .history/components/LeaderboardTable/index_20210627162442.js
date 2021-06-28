import React, { useState } from 'react'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from '@windmill/react-ui'
import PieChart from '../Charts/PieChart/index'
import BarChart from '../Charts/BarChart/index'

function sanitize(text) {
    if(!text) return '';
    return (text.length > 50) ? `${text.substring(0, 50)}...` : text || '';
}

const buttonClass = 'py-1 px-1 border border-2 rounded-md shadow-md ml-1 '

function useClickstreamLeaderboards(email)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/statistics` : null, fetcher)

    return {
        data: data ? data.headers : {},
        loading: !data && !err,
        error: err
    };
}


const DataTable = ({ data, title }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell> {title} </TableCell>
                    <TableCell> Visits </TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(data).map((datum, index) => {
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
    )
}

const DataChart = ({ data, title, type }) => {

    return (
        <span className="text-md font-extralight"> 
           
           {type==='pie' ?
            <PieChart 
                sortedData={data} 
                title={title} 
                type={type} 
            /> 
        :   <BarChart 
                sortedData={data} 
                title={title} 
                type={type} 
            />}
        </span>
    )
}




const LeaderboardTableItem = ({ data, title, type }) => {
    if(!data) return null

    const [displayType, setDisplayType] = useState('table')

    return (
        <div className="w-auto bg-white text-black rounded-md shadow-lg">
            <TableContainer>
                <div className="w-full inline-flex justify-between align-stretch mb-1 p-1">
                    <span className="text-md font-light">
                        {title}
                    </span>
                    <span className="inline-flex justify-end align-stretch">
                        <button 
                            className={`${buttonClass}${displayType==='table'?'bg-black text-white' : 'bg-white text-black'}`} 
                            onClick={() => setDisplayType('table')}
                        >
                            <span className="text-sm font-extralight"> 
                                table 
                            </span>
                        </button>
                        <button 
                            className={`${buttonClass}${displayType==='chart'?'bg-black text-white' : 'bg-white text-black'}`} 
                            onClick={() => setDisplayType('chart')}
                        >
                            <span className="text-sm font-extralight"> 
                                chart
                            </span>
                        </button>
                    </span>
                </div>
                
                {displayType==='table' && <DataTable data={data} title={title} />}
            </TableContainer>

            { displayType!=='table' &&  <DataChart data={data} title={title} type={type} />}
        </div>
    )
}


const LeaderboardTable = ({ email, time }) => {
    
    const {data, loading, error} = useClickstreamLeaderboards(email) 
    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    let aggregatedStats = aggregateStats(data)
    let leaderboards = [
        { id: 'topUserAgents', data: aggregatedStats.userAgents.slice(0, 5), title: 'User Agents'  },
        { id: 'topHttpProtocols', data: aggregatedStats.httpProtocols.slice(0,5), title: 'HTTP Protocols'}, 
        { id: 'topTlsVersions', data: aggregatedStats.tlsVersions.slice(0,5), title: 'TLS Versions'},
    ];
    let barCharts = [
        { id: 'topIps', data: aggregatedStats.ips.slice(0, 5), title: 'IP Addresses' },
        { id: 'topHosts', data: aggregatedStats.hosts.slice(0, 5), title: 'Hosts' }, 
    ]

    return (
        <div className="w-full-screen container mx-auto mt-4 p-2">
            <div className="inline-flex justify-start align-stretch">
                {Object.entries(leaderboards).map(function(pieChartData, index) {
                    return (
                        <div key={index} className="flex justify-start align-stretch m-1 p-2 rounded-md shadow">
                            <LeaderboardTable 
                                data={pieChartData[1].data} 
                                title={pieChartData[1].title}
                                type="pie"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="inline-flex flex-wrap justify-start align-center">
                {Object.entries(barCharts).map(function(barChartTable, index) {
                    return (
                        <div key={index} className="flex justify-start align-stretch m-1 p-2 rounded-md shadow">
                            <LeaderboardTable
                                data={barChartTable[1].data}
                                title={barChartTable[1].title}
                                type="bar"
                            /> 
                            <p> {barChartTable[1].type} </p>
                        </div>
                    )
                })}
            </div> 

        </div>
    )
}

export default LeaderboardTable