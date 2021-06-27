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

const Pill = ({ selected, handleSelect, withoutBorder, label }) => {
    const unselectedPillStyle = withoutBorder ? 'hover:text-white' : 'hover:bg-gray-400 hover:text-white'
    const selectedPillStyle = withoutBorder ? 'text-blue-700' : 'text-white-200 bg-blue-900'
    
    return (
        <div
            onClick={handleSelect}
            className={`
                text-xs text-gray-900 bg-white px-3 py-2 cursor-pointer transition
                ${withoutBorder ? 'border-r border-blue-900 last:border-r-0 text-gray-400' : 'border rounded-md text-blue-500'}
                ${selected ? selectedPillStyle : unselectedPillStyle}
            `}
        >
            {label}
        </div>
    );
}

const OptionsBar = () => {
    const [selected, setSelected] = useState('timeseries')
    
    const handleSelect = (e) => {
        setSelected(e.target.value)
    }

    return (
        <div className="flex-shrink-0 m-2 p-2">
            <div className="w-full inline-flex justify-end align-stretch">
                <Pill 
                    value="timeseries"
                    selected={selected==='timeseries'} 
                    onSelectPill={handleSelect} 
                    withoutBorder={false} 
                    label="timeseries" 
                />
                <Pill 
                    value="aggregated"
                    selected={selected==='aggregated'} 
                    onSelectPill={handleSelect} 
                    withoutBorder={false} 
                    label="aggregated" 
                />
            </div>
        </div> 
        
    )
}

function ClickstreamTimeseries() {

    const { data, error } = useSWR('/api/stream/timeseries', fetcher)

    if(!data && !error) return <Loader />
    if(error) return <p> Error! </p>

    return (
        <div className="mt-4 h-full w-full rounded-md shadow-lg bg-white hover:bg-blue-200">
            <OptionsBar /> 
            <LineChart  data={sanitizeData(data.freqs)} />
            {/* <LineChart data={normalizeTimeseries(data.timeseries)} />  */}
            {/* <span className="text-sm text-black">
                {JSON.stringify(normalizeTimeseries(data.timeseries))}
            </span> */}
        </div>
    )
}

export default ClickstreamTimeseries