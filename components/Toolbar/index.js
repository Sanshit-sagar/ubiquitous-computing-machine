import React from 'react' 

import {
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import Dropdown from '../Dropdown'

  const items = [
        { id: 0, name: 'TODO', icon: <ReplyIcon className="mr-2.5 h-5 w-5 text-gray-400" /> },
        { id: 1, name: 'TODO', icon:<PencilIcon className="mr-2.5 h-5 w-5 text-gray-400" /> },
        { id: 2, name: 'TODO', icon: <UserAddIcon className="mr-2.5 h-5 w-5 text-gray-400" /> },
        { id: 5, name: 'TODO', icon: <FolderDownloadIcon className="mr-2.5 h-5 w-5 text-gray-400"/ >},
       
  ]

function Toolbar() {

    return (
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
            <div className="h-16 flex flex-col justify-center">
                <div className="px-1">
                    {/* <div className="py-3 flex justify-start"> */}
                 
                        <div className="w-full inline-flex justify-end align-stretch">
                           
            
{/*                             
                            <span className="ml-4 relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3 mr-3">
                                <span className="inline-flex sm:shadow-sm">
                                    {items.map(function(elem, index) {
                                        return (
                                            <button
                                                type="button"
                                                className="hidden sm:inline-flex -ml-px mr-2 rounded-md relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                            >
                                                {elem.icon}
                                                <span>{elem.name}</span>
                                            </button>
                                        );
                                    })}
                                </span>
                            </span>

                        </div> */}
                        <Dropdown />
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toolbar