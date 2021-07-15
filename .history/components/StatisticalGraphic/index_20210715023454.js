import React, { useContext } from 'react'

import { Spinner } from '@blueprintjs/core'
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
                content: 
                    <SortedStatModal filter={id} />
            }
        });
    }

    const handleViewAll = () => {
        console.log(`Opening modal from ${name}`);
        handleDispatchModal();
    }
    

    return (
        <div className="bg-white text-gray-700 shadow-md rounded-md p-2">
            <div className="flex items-center">
                {icon}
                <span class="text-md ml-2 text-extralight">
                    {name}
                </span>
            </div>
        
            <div className="inline-flex justify-between align-stretch w-full">
                <p className="text-4xl text-left font-bold my-4">
                    {loading || loadingStat ? <Spinner size={20} intent="primary" /> : `${value}`}
                </p>

                {/* <div className="rounded-sm shadow-lg bg-gray-300">
                    <Button onClick={handleView<p>-</p> 
                </div> */}
                
                {/* <div className="mt-1">
                    <button 
                        onClick={handleViewAll}
                        className="w-full flex justify-center items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-extralight rounded-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                        View {name}
                    </button>
                </div> */}
            </div>
        </div>
    );
}


export default Statistic