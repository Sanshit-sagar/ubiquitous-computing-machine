import React, { useState, useEffect, useContext } from 'react'
import { NewSlugStore } from '../../store'
import {
    PlusIcon
} from '@heroicons/react/outline'

const StatsOverview = () => {
    const people = [
        {
          name: 'Leonard Krasner',
          handle: 'leonardkrasner',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Floyd Miles',
          handle: 'floydmiles',
          imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ];

    return (
        <div>
            <div className="flow-root mt-6">
                <ul className="-my-5 divide-y divide-gray-200">
                    {people.map((person) => (
                        <li key={person.handle} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img 
                                        className="h-8 w-8 rounded-full" 
                                        src={person.imageUrl} 
                                        alt="" 
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                  
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {person.name}
                                    </p>

                                    <p className="text-sm text-gray-500 truncate">
                                        {'@' + person.handle}
                                    </p>

                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <a
                    href="#"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    View all
                </a>
            </div>
        </div>
    );
}
           

export default StatsOverview