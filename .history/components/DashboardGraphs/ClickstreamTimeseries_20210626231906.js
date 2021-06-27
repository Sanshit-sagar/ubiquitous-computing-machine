import React, { useState, useEffect } from 'react'

import useSWR from 'swr'
import axios from 'axios'

import Loader from '../Loader'
import LineChart from '../Charts/LineChart/index'
import Toolbar from '../Toolbar'

const fetcher = url => axios.get(url).then(res => res.data);

function sanitizeData(freqs) {
    let freqsArr = []

    Object.entries(freqs).forEach(entry => {
        freqsArr.push({ 
            x: entry[0], 
            y: parseInt(entry[1]) 
        });
    })
    return freqsArr; 
}

function normalizeTimeseries(freqs) {
    let freqsArr = []

    Object.entries(freqs).forEach(entry => {
        freqsArr.push({ 
            x: entry[0], 
            y: parseInt(entry[1]) 
        });
    })
    return freqsArr; 
}

const Pill = ({ selected, handleSelect, withoutBorder, label, key }) => {
    const unselectedPillStyle = withoutBorder ? 'hover:text-white' : 'hover:bg-gray-400 hover:text-white'
    const selectedPillStyle = withoutBorder ? 'text-blue-700' : 'text-white-200 bg-blue-900'
    
    return (
        <button
            value={key}
            onClick={handleSelect}
            className={`
                text-xs font-extralight text-white px-2 py-1 cursor-pointer transition border rounded-md ml-1 mr-1'}
                ${selected ? selectedPillStyle : unselectedPillStyle}
            `}
        >
            {label}
        </button>
    );
}

const options = [
    {
        key: 'allTime',
        label: 'All time',
        value: 'inf',
    },
    {
        key: 'pastNinetyDays',
        label: 'Past 90 days',
        duration: 90*24*60*60*1000,
        value: '90',
    },
    {
        key: 'pastThirtyDays',
        label: 'Past 30 days',
        duration: 30*24*60*60*1000,
        value: '30',
    },
    {
        key: 'pastWeek',
        label: 'Past week',
        duration: 7*24*60*60*1000,
        value: '7',
    },
    {
        key: 'pastDay',
        label: 'Past day',
        duration: 24*60*60*1000,
        value: '1',
    },
];

const OptionsBar = () => {
    const [selected, setSelected] = useState('pastDay')
    
    const handleSelect = (event) => {
        setSelected(event.target.value)
    }

    return (
        <div className="flex-shrink-0 m-2">
           {/* <p className="text-black">  {selected} </p> */}
            <div className="w-full inline-flex justify-end align-stretch">
                {options.map(function(option, index) {
                    return (
                        <span key={index}>
                            <Pill 
                                value={option.value}
                                selected={selected===option.label} 
                                handleSelect={handleSelect} 
                                withoutBorder={false} 
                                label={option.label} 
                                key={options[index].key}
                            />
                        </span>
                    );
                })}
            </div>
        </div> 
    )
}

function ClickstreamTimeseries() {

    const { data, error } = useSWR('/api/stream/hourlySeries', fetcher)

    if(!data && !error) return <Loader />
    if(error) return <p> Error! </p>

    return (
        <div className="mt-4 h-full w-full rounded-md shadow-lg">
            <OptionsBar /> 
            <span className="text-white">
                {new Date(data.minTime).toISOString()}
            </span> 
            <LineChart data={sanitizeData(data.freqs)} />
            {/* <LineChart data={normalizeTimeseries(data.timeseries)} />  */}
            {/* <span className="text-sm text-black">
                {JSON.stringify(normalizeTimeseries(data.timeseries))}
            </span> */}
        </div>
    )
}

export default ClickstreamTimeseries