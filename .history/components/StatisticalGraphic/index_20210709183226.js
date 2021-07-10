import React, { useContext } from 'react'

import Loader from '../Loader/index'
import { NewSlugStore } from '../../store';
import { EyeIcon } from '@heroicons/react/solid';


const ModalContent = () => {
    const headers = ['Date', 'Description', 'Amount', 'View Reciept Only'];

    const payments = [
        {
            id: 1,
            date: '1/1/2020',
            datetime: '2020-01-01',
            description: 'Work Plan - gamify system',
            amount: 'CA$109.00',
            href: '#',
        }, 
        {
            id: 1,
            date: '1/1/2020',
            datetime: '2020-01-01',
            description: 'Work Plan - gamify system',
            amount: 'CA$109.00',
            href: '#',
        },
    ]; 

    return (
        <main>
            <section aria-labelledby="statistic summary blocks">
                <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                    <div className="mt-6 flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden border-t border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {headers.map(function(value, index) {
                                                    return (
                                                        <th 
                                                            key={index} 
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            {value}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {payments.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <time dateTime={payment.datetime}>
                                                            {payment.date}
                                                        </time>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.amount}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Button
                                                            size="small"
                                                            type="primary"
                                                            icon={<EyeIcon />}
                                                        >
                                                            view
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

const Statistic = ({ email, stat, loading }) => {
    
    const dispatch = useContext(NewSlugStore.Dispatch)
    const { name, value, icon, loadingStat, error } = stat

    const handleDispatchModal = () => {
        dispatch({
            type: 'openModal',
            payload: {
                tenant: `Statistic: ${name}`,
                title: `${name}`,
                content: <ModalContent />
            }
        });
    }

    const handleViewAll = () => {
        console.log(`Opening modal from ${name}`);
        handleDispatchModal();
    }
    

    return (
        <div class="bg-white text-gray-700 shadow-md rounded-md p-2 h-50">
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
                        email='sanshit.sagar@gmail.com'
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