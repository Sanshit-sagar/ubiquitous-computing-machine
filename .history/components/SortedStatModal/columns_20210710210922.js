import React, { useMemo } from 'react'
import 

const columns = React.useMemo(() => [
    {
        Header: 'Key',
        accessor: `key`,
        width: 75,
    },
    {
        Header: 'Slug',
        accessor: `slug`,
    },
    {
        Header: 'Destination URL',
        accessor: `destination`,
    },
    {
        Header: 'Location',
        accessor: `geodata`,
        width: 75,
    },
    {
        Header: 'Coordinates',
        accessor: `coordinates`,
        width: 75,
    },
    {
        Header: 'IP Address',
        accessor: `ip`,
    },
    {
        Header: 'Host',
        accessor: `host`,
    },
    {
        Header: 'Browser',
        accessor: `browser`,
    },   
    {
        Header: 'Engine',
        accessor: `engine`,
    },
    {
        Header: 'OS',
        accessor: `os`,
    },
    {
        Header: 'Time Taken',
        accessor: `timeTaken`,
    },
    {
        Header: 'Timestamp',
        accessor: `datetime`,
    },
], []);

function getColumns(key) {
    if(!key || !key.length) {
        return null; 
    }

    if(key==='mostViewedPages') {
        return columns;
    } else if(key==='allLinks') {
        return columns; 
    } else if(key==='uniqueVisitors') {
        return columns;
    } else if(key==='allLinks') {
        return columns;
    }

    return null; 
}

export default getColumns 