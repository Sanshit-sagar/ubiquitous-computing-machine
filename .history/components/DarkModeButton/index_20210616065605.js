import React, {useState, useEffect} from 'react';
import {Switch} from '@headlessui/react'
import {MoonIcon, SunIcon} from '@heroicons/react/solid'
import toast from 'react-hot-toast'
// import useMediaQuery from '../hooks/useMediaQuery';
// import { useTheme } from 'next-themes'

const customToast = ({ theme, title, message, isSuccess, isFailure }) => {
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
                  {title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
    ));
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DarkModeButton = () => {
    const [mounted, setMounted] = useState(false)
   
    const [theme, setTheme] = React.useState('light')
    const [enabled, setEnabled] = React.useState(false)

    const currentTheme = theme === 'system' ? systemTheme : theme; 

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleThemeChange = () => {
        if(currentTheme === 'light') {
            setTheme('dark');
            setEnabled(true);
            
        } else {
            setTheme('light');
            setEnabled(false); 
            
        }
    }

    return (
        <>
            { mounted ? 
                <Switch
                    checked={theme==='dark'}
                    onChange={handleThemeChange}
                    className={classNames(
                        enabled ? 'bg-indigo-600' : 'bg-red-400',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                >
                    <span
                        className={classNames(
                            enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                    >
                        <span
                            className={classNames(
                                enabled ? 'opacity-100 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                        >
                            { enabled ?  <MoonIcon className="w-7 h-7" /> : <SunIcon className="w-7 h-7" /> }
                        </span>
                    </span>
                </Switch>
            : null}
        </>
    )
}

export default DarkModeButton
