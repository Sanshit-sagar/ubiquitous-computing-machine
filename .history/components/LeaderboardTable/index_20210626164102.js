import React, { useState } from 'react'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from '@windmill/react-ui'


function sanitize(text) {
    if(!text) return '';
    return (text.length > 50) ? `${text.substring(0, 50)}...` : text || '';
}

const buttonClass = 'bg-white text-gray-700 hover:bg-gray-300 hover:text-blue-800 py-1 px-1 border border-2 rounded-md shadow-md'

const LeaderboardTable = ({ data, title }) => {
    if(!data) return null

    const [dispayType, setDispayType] = useState('table')

    return (
        <div className="w-auto">
            <TableContainer className="bg-white">
                <div className="inline-flex justify-end align-stretch mb-1 p-1">
                    <button className={buttonClass} onClick={() => setDispayType('chart')}>
                       <span className="text-sm font-extralight"> chart </span>
                    </button>
                    <button className={buttonClass} onClick={() => setDispayType('table')}>
                        <span className="text-sm font-extralight"> table </span>
                    </button>
                </div>
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
            </TableContainer>
        </div>
    )
}

export default LeaderboardTable