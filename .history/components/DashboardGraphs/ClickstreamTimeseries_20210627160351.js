import React, { useState } from 'react'

import useSWR from 'swr'
import axios from 'axios'

import Loader from '../Loader'
import LineChart from '../Charts/LineChart/index'
// import Toolbar from '../Toolbar'

const fetcher = url => axios.get(url).then(res => res.data);

// function sanitizeData(freqs) {
//     let freqsArr = []

//     Object.entries(freqs).forEach(entry => {
//         freqsArr.push({ 
//             x: entry[0], 
//             y: parseInt(entry[1]) 
//         });
//     })
//     return freqsArr; 
// }

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
        key: 'hourly',
        label: 'Hourly',
        value: 60,
    },
    {
        key: '4Hourly',
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
                                handleSelect={() => handleSelect(option.key)} 
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


    let filter = selected 
    const { data, error } = useSWR(`/api/stream/clickstream/hourly?filter=${filter}`, fetcher)

    if(!data && !error) return <Loader />
    if(error) return <p> Error! </p>

    return (
        <div className="w-auto min-w-100 pt-1 m-2 bg-gray-700 rounded-md shadow-lg">
            <OptionsBar 
                selected={selected} 
                handleSelect={handleSelect} 
            /> 
                <LineChart 
                    data={data.cummulative} 
                    title="Cummulative" 
                />

            {/* <p> avg: {data.average}, max: {data.max} </p>
            <p> mintime: {new Date(data.minTime).toISOString()} </p>
            <p> maxtime: {new Date(data.maxTime).toISOString()} </p>
            <p> timespan: {data.timespan} </p> */}
            {/* <p> {JSON.stringify(data.cummulative)} </p> */}
        </div>
    )
}

export default ClickstreamTimeseries