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
        // <div className="container mx-auto">
             <span className="text-md font-extralight"> */}
                { 
                    type==='pie' ?
                    <PieChart sortedData={data} title={title} /> :
                    <BarChart sortedData={data} title={title} />
                }
            </span>
        // </div>
    )
}


const LeaderboardTable = ({ data, title, type }) => {
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
                
                {   displayType==='table' ? 
                    <DataTable data={data} title={title} /> :  
                    <DataChart data={data} title={title} type={type} /> 
                }
            </TableContainer>
        </div>
    )
}

export default LeaderboardTable