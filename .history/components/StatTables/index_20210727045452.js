import React, { Fragment, useContext } from 'react'
import { Elevation, Tag, Button } from '@blueprintjs/core'
import ScrollView from '../../primitives/ScrollView'
import toast from 'react-hot-toast'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import aggregateStats from '../../lib/statistics'
import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'
import { NewSlugStore } from '../../store'

import axios from 'axios'
import useSWR from 'swr'
import Loader from '../Loader'
import { Card } from '../../primitives/Card'

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email, timeFilter)  {
    const time = timeFilter || '30'
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}


const ActiveDatasetSelector = ({ email }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { clickstream, loading, error } = useUserClickstreams(email)
    const { sortedCountries, sortedIps, sortedDestinations, sortedUserAgents, userAgents } = aggregateStats(clickstream)
    const { sua, suaLoading, suaError } = useAggregatedUserAgentStats(email, Object.keys(userAgents))
    const { start, end, max, maxIndex, timeseries, freqs, average, userAgent, tsLoading, tsError }  = useTimeseries(email)

    const finalizedData = [
        { index: '0', title: 'Top Destinations', variable: 'destinations', stat: sortedDestinations, loading: loading },
        { index: '1', title: 'Top Dates', variable: 'Dates', stat: freqs || [],  loading: suaLoading || loading },
        { index: '2', title: 'Top Countries', variable: 'country', stat: sortedCountries, loading: loading },
        { index: '3', title: 'Top IP Addresses', variable: 'ip', stat: sortedIps,  loading: loading},
        { index: '4', title: 'Top Operating Systems', variable: 'osNames', stat: sortedIps, loading : suaLoading },
        { index: '5', title: 'Top Browsers', variable: 'browsers', stat: sortedIps, loading: suaLoading },
        { index: '6', title: 'Top Engines', variable: 'engines', stat: sortedIps, loading: suaLoading },
    ];
    
    const handleUpdatedSelection = (updatedSelection) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'activeDataset',
                value: {
                    index: updatedSelection.index,
                    title: updatedSelection.title,
                    variable: updatedSelection.variable,
                    stat: [...updatedSelection.stat],
                }
            }
        }); 
    }

    const handleTableVisibility = (mssg) => {
        toast.success(`toggling visibility ${mssg}`)
        dispatch({
            type: 'toggle',
            payload: {
                'key': state.isTableVisible ? false : true,
            }
        }); 
    }
    
    return (
        <div className="w-72">
            <Listbox 
                value={state.activeDataset} 
                onChange={(updatedSelection) => handleUpdatedSelection(updatedSelection)}
            >
                <div className="relative mt-1">
                    <Listbox.Button 
                        className="relative w-full py-2 pl-3 pr-10 shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                    >
                        <button onClick={() => handleTableVisibility('yo')}>
                            <span className="block truncate">
                                {state.activeDataset.title}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="w-5 h-5 text-pink-400" />
                            </span>
                        </button>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-700  rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {finalizedData.map((data) => (
                                <Listbox.Option
                                    key={data.index}
                                    className={({ active }) =>
                                        `${active 
                                            ? 'text-amber-900 bg-amber-100' : 'text-gray-900 '}
                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={data}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                                {data.title}
                                            </span>
                                                {selected ? (
                                                        <span className={
                                                                `${active ? 'text-red-600' : 'text-green-600'}
                                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                                                            <CheckIcon className="w-5 h-5 text-pink-500" />
                                                        </span>
                                                    ) : null
                                                }
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    ); 
}

const DataTable = ({ title, variable, data, loading }) => {

    let topData = [];
    let temp = !loading && data?.length ? [...data] : [];
    topData = temp?.length && temp.length >= 10 ? temp.splice(0,5) : temp 

    return (
            <table 
                className="bp3-html-table bp3-html-table-striped bp3-html-table-bordered 
                            bp3-html-table-condensed bp3-interactive bp3-small"
            >
                <thead>
                    <tr>
                        <th style={{ width: '225px' }}>
                            <span className="text-sm font-extralight"> 
                                {variable}
                            </span>
                        </th>
                        <th style={{ width: '75px' }}>
                            <span className="text-sm font-extralight"> 
                                Visits 
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {topData?.length && topData.map(function(value, index) {
                        return (
                            <tr key={index}>
                                <td>
                                    <span className="text-sm font-extralight"> 
                                        {loading ? <Loader /> : `${value[0].substring(0, 30)}${value[0].length >= 30 ? '...' : ''}`}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-sm font-extralight"> 
                                        {loading ? <Loader /> : value[1]}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    );
}

const useAggregatedUserAgentStats = (email, userAgents) => {
    const { data, error } = useSWR(email && email.length && userAgents && userAgents.length ? `/api/user-agent/aggregate/${email}?userAgents=${userAgents}` : null, fetcher)

    return {
        sua: data && data.sua && data.sua.length ? {
            engines: Object.entries(data.sua.sortedEngines),
            browsers: Object.entries(data.sua.sortedBrowsers),
            osNames: Object.entries(data.sua.sortedOsNames),
         } : null,
        suaLoading: !data && !error, 
        suaError: error
    }
}

const useTimeseries = (email) => {
    const { data, error } =  useSWR(email && email.length ? `/api/stream/statistics/${email}` : null, fetcher);

    return {
        timeseries: data ? data.timeseries : [],
        curatedStats: {
            periodStart: data ? data.earliestEvent : [],
            periodEnd: data ? data.latestEvent : [],
            maxViewsValue: data ? data.max :[],
            maxViewsDate: data ? data.maxIndex : [],
            invalidDays: data ? data.skipped : [],
            totalDays: data ? data.count : [],
            avgDailyViews: data ? data.average :[],
        },
        daysSortedByViews: data && data.freqs ? Object.entries(data.freqs).sort((a, b) => data.freqs[b[0]] - data.freqs[a[0]]) : [],
        summaryLoading: !data && !error,
        summaryError: error
    };
}

const DataVisualizer = ({ data, title, type }) => {

    return (
        <div className="text-md font-extralight"> 
           {type==='pie' ?
                <PieChart 
                    sortedData={data}
                    title={title} 
                    type={type} 
                /> 
                : <BarChart 
                    sortedData={data}
                    title={title} 
                    type={type} 
                />
            }
        </div>
    )
}

const StatTables = ({ email }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { clickstream, loading, error } = useUserClickstreams(email)
    const { sortedCountries, sortedIps, sortedDestinations, sortedUserAgents, userAgents } = aggregateStats(clickstream)
    const { sua, suaLoading, suaError } = useAggregatedUserAgentStats(email, Object.keys(userAgents))
    const { timeseries, curatedStats, daysSortedByViews, summaryLoading, summaryError }  = useTimeseries(email)

    const handleGraphTypeUpdate = (updatedType) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'activeChart',
                value: updatedType
            }
        }); 
    }

    const finalizedData = [
        { index: '0', title: 'Top Destinations', variable: 'destinations', stat: sortedDestinations, loading: loading },
        { index: '1', title: 'Top Dates', variable: 'Dates', stat: daysSortedByViews, loading: loading || summaryLoading },
        { index: '2', title: 'Top Countries', variable: 'country', stat: sortedCountries, loading: loading },
        { index: '3', title: 'Top IP Addresses', variable: 'ip', stat: sortedIps, loading: loading},
        { index: '4', title: 'Top Operating Systems', variable: 'user-agent.os.name', stat: sua.sortedOsNames, loading: loading || suaLoading },
        { index: '5', title: 'Top Browsers', variable: 'user-agent.browser.name', stat:  sua.sortedBrowsers, loading: loading || suaLoading },
        { index: '6', title: 'Top Engines', variable: 'user-agent.engine.name', stat:  sua.sortedEngines, loading: loading || suaLoading },
    ];

    if(error || suaError || summaryError) {
        return (
            <p> Error! 
                `${   error     ? error.message 
                    : suaError  ? suaError.message 
                    : summaryError.message
                }` 
            </p>
        )
    }

    return (
        <Card interactive={true} style={{ width: '1100px', width: '450px' }}>
            <div style={{ width: '100%', marginHorizontal: '12.5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', margin: '0px 0px 20px 0px', padding: '2.5px' }}>
                
                <div>
                     <ActiveDatasetSelector email={email} /> 
                </div>

                <div>
                    <Button
                        size="medium"
                        type="outline"
                        icon="pie-chart"
                        onClick={() => {handleGraphTypeUpdate('pie')}}
                        style={{ margin: '0px 5px 0px 5px' }}
                    />
                    <Button
                        size="medium"
                        type="outline"
                        icon="horizontal-bar-chart"
                        onClick={() => {handleGraphTypeUpdate('bar')}}
                        style={{ margin: '0px 5px 0px 5px' }}
                    /> 
                </div>
            </div>

            <div style={{ width: '1000px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch' }}>    
                
                <DataTable
                    title={finalizedData[state.activeDataset.index].title}
                    variable={finalizedData[state.activeDataset.index].variable}
                    data={finalizedData[state.activeDataset.index].stat}
                    width={finalizedData[state.activeDataset.index].width}
                    loading={finalizedData[state.activeDataset.index].loading}
                /> 

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    
                    <DataVisualizer
                        data={finalizedData[state.activeDataset.index].stat}
                        title={finalizedData[state.activeDataset.index].title}
                        type={state.activeChart || 'pie'}
                    />
                    
                </div>
            </div>
        </Card>
    );
}


export default StatTables