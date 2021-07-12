import React, { useContext } from 'react'

import Loader from '../Loader/index'
import { NewSlugStore } from '../../store';
import SortedStatModal from '../SortedStatModal';

const Statistic = ({ email, stat, loading }) => {
    
    const dispatch = useContext(NewSlugStore.Dispatch)
    const { id, name, value, icon, loadingStat, error } = stat

    const handleDispatchModal = () => {
        dispatch({
            type: 'openModal',
            payload: {
                tenant: `Statistic: ${name}`,
                title: `${name}`,
                content: <SortedStatModal filter={id} email={email} />
            }
        });
    }

    const handleViewAll = () => {
        console.log(`Opening modal from ${name}`);
        handleDispatchModal();
    }
    

    return (
        <div class="bg-white text-gray-700 shadow-md rounded-md p-2">
            <div class="flex items-center">
                {icon}
                <span class="text-md ml-2 text-extralight">
                    {name}
                </span>
            </div>
        
            <div class="flex flex-col justify-start">
                <p class="text-4xl text-left font-bold my-4">
                    {loading || loadingStat ? <Loader /> : `${value}`}
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