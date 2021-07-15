import React, { useState, useEffect, useContext } from 'react';

import {Switch} from '@headlessui/react'
import {MoonIcon, SunIcon} from '@heroicons/react/solid'
import {GlobalStore} from '../../store'

import Loader from '../Loader'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'
import ToggleButton from '../../primitives/Toggle'

const DarkMode = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, []); 

    const toggleDarkMode = () => {
        if(!mounted) return 
        try {
            dispatch({type: 'toggle_dark_mode'});
            setTheme(theme === 'dark' ? 'light' : 'dark') 
            toast.success(`Theme was changed to: ${theme} mode`);
        } catch(error) {
            toast.error(`Oh no, couldn't update theme`); 
        }
    }

    const StyledSunIcon = () => <SunIcon className="h-6 w-6 text-red-600 hover:focus-ring-2 hover:focus-ring-yellow-500" />;
    const StyledMoonIcon = () => <MoonIcon className="h-6 w-6 text-blue-800 hover:focus-ring-2 hover:focus-ring-yellow-500" />;

    if(!mounted) return <Loader /> 

    return (
        <div style={{ marginRight: '5px' }}>
            <ToggleButton 
                isPressed={state.darkMode}
                handlePress={toggleDarkMode}
                pressedElem={<StyledMoonIcon />} 
                unpressedElem={<StyledSunIcon />}
            /> 
        </div>
    )

    // return (
        // <Switch
        //     checked={state.darkMode}
        //     onChange={toggleDarkMode}
        //     className={
        //             `${!state.darkMode ? 'bg-gray-800' : 'bg-blue-200'} 
        //             relative inline-flex items-center h-6 rounded-full w-11`
        //         }
        // >
        //     <span className={`${state.darkMode ? 'translate-x-6' : 'translate-x-1'} 
        //             inline-block w-4 h-4 transform bg-white rounded-full`}
        //     >
        //         {
        //               state.darkMode 
        //             ? <MoonIcon className="h-4 w-4 text-green-400 hover:focus-ring-2 hover:focus-ring-yellow-500" /> 
        //             : <SunIcon className="h-4 w-4 text-pink-800 hover:focus-ring-2 hover:focus-ring-yellow-500" />

        //         }
        //     </span>
        // </Switch>
    // );
}

export default DarkMode
