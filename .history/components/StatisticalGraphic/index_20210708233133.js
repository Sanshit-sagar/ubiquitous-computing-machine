import React, { useContext } from 'react'

import Loader from '../Loader/index'
import { NewSlugStore } from '../../store';

const DeltaIncreaseSvg = () => {
    return (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
        </svg>
    );
}

const Statistic = ({ stat, loading, modalContent }) => {
    
    const dispatch = useContext(NewSlugStore.Dispatch)
    const { name, value, icon, loadingStat, error } = stat

    const handleDispatchModal = () => {
        dispatch({
            type: 'openModal',
            payload: {
                tenant: `Statistic: ${name}`,
                title: `${name}`,
                content: modalContent
            }
        });
    }

    const handleViewAll = () => {
        console.log(`Opening modal from ${name}`);
        handleDispatchModal();
    }
    

    return (
        <div class="bg-white text-gray-700 shadow-lg rounded-md p-2">
            <div class="flex items-center">
                {icon}
                <span class="text-md ml-2 text-extralight">
                    {name}
                </span>
            </div>
        
            <div class="flex flex-col justify-start">
                <p class="text-4xl text-left font-bold my-4">
                    {loading || loadingStat ? <Loader /> : !error ? value : "--/--"}
                </p>
                
                <div className="mt-1">
                    <button
                        onClick={handleViewAll}
                        className="w-full flex justify-center items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-extralight rounded-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                        View all
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Statistic