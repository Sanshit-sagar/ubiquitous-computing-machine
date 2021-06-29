import React, { useState, useEffect, useContext } from 'react';

import {Switch} from '@headlessui/react'
import {MoonIcon, SunIcon} from '@heroicons/react/solid'
import {GlobalStore} from '../../store'

import Loader from '../Loader'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'

function broadcastCustomToast(title, message, isSuccess) { 
    // (_, _, 1) for success (_, _, -1) for failure 
    
    
    return toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave',
            theme!=='dark' ? 'bg-white' : 'bg-black'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              
              <div className="ml-3 flex-1">
                <p className={theme!=='dark' ? "text-sm font-medium text-gray-900" : "text-sm font-medium text-gray-100"}>
                    {isSuccess ? `Success: ${title}!` : isFailure ? `Failed: ${title}` : `${title}`}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    {message}
                </p>
              </div>
            </div>
          </div>
            <div className="flex border-l border-indigo-600">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                    </button>
                </div>
            </div>
        ))
    }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DarkModeButton = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, []); 

    const toggleDarkMode = () => {
        if(!mounted) return 
        try {
            dispatch({
                type: 'toggle_dark_mode'
            });
            setTheme(theme === 'dark' ? 'light' : 'dark') 
            broadcastCustomToast('Theme Change', `Theme was changed to: ${theme} mode`, 1)
        } catch(error) {
            broadcastCustomToast('Theme Change', `Couldn't change theme to: ${theme} mode`, -1)
        }
    }

    return (
        <span className="mr-5">
           
                <Switch
                    checked={state.darkMode}
                    onChange={toggleDarkMode}
                    className={classNames(false ? 'bg-green-200' : 'bg-indigo-700',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                >
                    <span
                        className={classNames(
                           'w-5' ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                    >
                        <span
                            className={classNames(
                                state.darkMode ? 'opacity-100 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                            )}
                        >
                            { state.darkMode ?  <MoonIcon className="w-7 h-7" /> : <SunIcon className="w-7 h-7" /> }
                        </span> 
                    </span>
                </Switch>
        </span>
    )
}

export default DarkModeButton
