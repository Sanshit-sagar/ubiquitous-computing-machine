import React from 'react'

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

const LeaderboardTable = ({ data, title }) => {
    if(!data) return null
    
    return (
        <div className="w-auto">
            <TableContainer className="bg-gray-700">
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