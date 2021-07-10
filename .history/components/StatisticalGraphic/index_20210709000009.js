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
        }, {
            id: 1,
            date: '1/1/2020',
            datetime: '2020-01-01',
            description: 'Work Plan - gamify system',
            amount: 'CA$109.00',
            href: '#',
          },
        // More payments...
      ]

    return (
            <main>
                <section aria-labelledby="statistic summary blocks">
                    <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 sm:px-6">
                            <h2 id="billing-history-heading" className="text-lg leading-6 font-medium text-gray-900">
                                YOYOYOYO
                            </h2>
                        </div>

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
                                                    Date
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {persents.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <time dateTime={payment.datetime}>{payment.date}</time>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href={payment.href} className="text-orange-600 hover:text-orange-900">
                                                View receipt
                                                </a>
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
        <div class="bg-white text-gray-700 shadow-lg rounded-md p-2">
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