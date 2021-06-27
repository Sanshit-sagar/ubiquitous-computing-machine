import React from 'react'
// import {GlobalStore} from '../../store'


const ButtonGroup = ({ timeFilter, updateTimeFilter, options }) => {
    
    
    return (
        <>
        <h1> {`Selected is: ${timeFilter}`} </h1>
        <div class="flex items-center">
            <button type="button" onClick={() => updateTimeFilter(options[0].key)} className={"w-full border-l border-t border-b text-base font-extralight rounded-l-md  px-4 py-2" +  (timeFilter===options[0].key) ? "text-black bg-white hover:bg-gray-100" : "text-white bg-blue-700 hover:bg-blue-800" }>
                {options[0].key}
            </button>

            <button 
                type="button" 
                onClick={() => updateTimeFilter(options[1].key)} 
                className={"w-full border-1 rounded-md p2-m-2 text-base font-extralight text-black bg-white hover:bg-gray-400" +  (timeFilter===options[1].key) ? "text-black bg-white hover:bg-gray-100" : "text-white bg-blue-700 hover:bg-blue-800"}
            >
                {options[1].key}
            </button>

            <button type="button" onClick={() => updateTimeFilter(options[2].key)} className={"w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2" +  (timeFilter===options[2].key) ? "text-black bg-white hover:bg-gray-100" : "text-white bg-blue-700 hover:bg-blue-800"}>
                {options[2].key}
            </button>
            <button type="button" onClick={() => updateTimeFilter(options[3].key)} className={"w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2" +  (timeFilter===options[3].key) ? "text-black bg-white hover:bg-gray-100" : "text-white bg-blue-700 hover:bg-blue-800"}>
                {options[3].key}
            </button>
        </div>
        </>
    )
}

export default ButtonGroup