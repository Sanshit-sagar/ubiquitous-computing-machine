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
            onClick={() => handleSelect('key')}
            className={`
                text-xs font-extralight text-white px-2 py-1 cursor-pointer transition border rounded-md ml-1 mr-1'}
                ${selected ? selectedPillStyle : unselectedPillStyle}
            `}
        >
            {label}
        </button>
    );
}

// const options = [
//     {
//         key: 'allTime',
//         label: 'All time',
//         value: 'inf',
//     },
//     {
//         key: 'pastNinetyDays',
//         label: 'Past 90 days',
//         duration: 90*24*60*60*1000,
//         value: '90',
//     },
//     {
//         key: 'pastThirtyDays',
//         label: 'Past 30 days',
//         duration: 30*24*60*60*1000,
//         value: '30',
//     },
//     {
//         key: 'pastWeek',
//         label: 'Past week',
//         duration: 7*24*60*60*1000,
//         value: '7',
//     },
//     {
//         key: 'pastDay',
//         label: 'Past day',
//         duration: 24*60*60*1000,
//         value: '1',
//     },
// ];

const options = [
    {
        key: 'hourly',
        label: 'Hourly',
        value: 60,
    },
    {
        key: 'fourHourly',
        label: '4 Hourly',
        value: 60*4,
    },
    {
        key: 'daily',
        label: 'Daily',
        value: 60*24,
    },
];

const OptionsBar = ({ selected, handleSelect }) => {
    return (
        <div className="flex-shrink-0 m-2">
            <div className="w-full inline-flex justify-end align-stretch">
                {options.map(function(option, index) {
                    return (
                        <span key={index}>
                            <Pill 
                                selected={selected===option.key} 
                                handleSelect={handleSelect} 
                                withoutBorder={false} 
                                label={option.label} 
                                key={option.key}
                            />
                        </span>
                    );
                })}
            </div>
        </div> 
    )
}

function ClickstreamTimeseries() {
    const [selected, setSelected] = useState('hourly')
    
    const handleSelect = (key) => {
        setSelected(key)
    }

    const { data, error } = useSWR('/api/stream/hourlySeries', fetcher)

    if(!data && !error) return <Loader />
    if(error) return <p> Error! </p>

    return (
        <div className="mt-4 h-full w-full rounded-md shadow-lg">
            <OptionsBar  selected={selected} handleSelect={handleSelect} /> 
            { 
                selected==='hourly' ?  <LineChart data={sanitizeData(data.freqs)} /> :
                selected==='4hourly' ? <LineChart data={sanitizeData(data.fourHourFreqs)} /> :
                <p> error! </p> 
            }
        </div>
    )
}

export default ClickstreamTimeseries