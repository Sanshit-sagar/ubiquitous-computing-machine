import React, { useEffect } from 'react'
import { dispatch } from 'react-hot-toast/dist/core/store'
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

    const { name, value, icon, unit, delta, loadingStat, error } = stat

    useEffect(() => {
        if(!loading && !loadingStat && !error) {
            setStatDelta(delta)
            setStatValue(value)
        }
    }, [delta, value, statValue, statDelta, loadingStat, error, loading])

    return (
            <div class="bg-white text-gray-700 shadow-lg rounded-md p-2">
                <div class="flex items-center">
                    {icon}
                    <span class="text-md ml-2 text-extralight">
                        {name}
                    </span>
                </div>
            
            
                <button class="flex flex-col justify-start" onClick={() => handleClick}>
                    <p class="text-4xl text-left font-bold my-4">
                        {loading || loadingStat ? <Loader /> : !error ? value : "--/--"}
                    </p>
                    <div class="flex items-center text-green-500 text-sm">
                        { delta && parseInt(delta) > 0 ? <DeltaIncreaseSvg /> : '<<' } 
                        <span> {delta} </span>
                        <button  
                            className="text-xs font-extralight text-gray-400 ml-1" 
                            onClick={
                                () => dispatch({
                                    type: 'openModal',
                                    payload: {
                                        tenant: {name},
                                        // title: {}
                                        // description: state.description,
                                        // content: state.content
                                    }
                                })
                            }
                        >
                            over the past {unitsList[unit].str}
                        </button>
                    </div>
                </button>
            </div>
        );
}


export default Statistic