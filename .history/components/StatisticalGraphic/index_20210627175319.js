import React, { useEffect } from 'react'
import Loader from '../Loader/index'

const DeltaIncreaseSvg = () => {
    return (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
        </svg>
    )
}

const Statistic = ({ stat, unitsList, loading }) => {
    const [statValue, setStatValue] = React.useState('')
    const [statDelta, setStatDelta] = React.useState('')
    const [units, setUnits] = React.useState([])
    const [fetchCount, setFetchCount] = React.useState(0)

    const { name, value, icon, unit, delta, loadingStat, error } = stat

    useEffect(() => {
        if(!loading && !loadingStat && !error) {
            setStatDelta(delta)
            setStatValue(value)
            setUnits(unitsList)
            setFetchCount(fetch + 1)
        }
    }, [delta, value, statValue, statDelta, loadingStat, error, loading])

    return (
            <div class="bg-white shadow-lg rounded-md p-4 dark:text-white dark:bg-gray-700">
                <div class="flex items-center">
                    {loading ? <Loader /> : icon}
                    <span class="text-md text-black dark:text-white ml-2 text-extralight">
                        {loading ? <Loader /> : name}
                    </span>
                </div>
            
            
                <div class="flex flex-col justify-start">
                    <p class="text-black dark:text-gray-100 text-4xl text-left font-bold my-4">
                        {loading || loadingStat ? <Loader /> : !error ? value : "--/--"}
                    </p>
                    <div class="flex items-center text-green-500 text-sm">
                        { delta && parseInt(delta) > 0 ? <DeltaIncreaseSvg /> : '<<' } 
                        <span> {delta} </span>
                        <span class="text-xs font-extralight text-gray-400 ml-1">
                            over the past {unitsList[unit].str}
                        </span>
                    </div>
                </div>
            </div>
        );
}


export default Statistic