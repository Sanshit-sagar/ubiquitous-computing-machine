import React, { useMemo } from 'react' 


const getColumns = (key) => {
    if(!key || !key.length) {
        return null; 
    }
   
    // cols for allViews 
    const allViewsColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Destination URL',
            accessor: `destination`,
            width: 75,
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

    const mostViewedPagesColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Views',
            accessor: `views`,
            width: 75,
        },
    ];

    if(key==='mostViewedPages') {
        return mostViewedPagesColumns;
    } else if(key==='allViews') {
        return allViewsColumns; 
    } else if(key==='uniqueVisitors') {
        return columns;
    } else if(key==='allLinks') {
        return columns;
    }

    return null; 
}

export default getColumns 