import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'
import {GlobalStore} from '../../store'

import Loader from '../Loader'
import ToggleButton from '../../primitives/Toggle'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

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
        } catch(error) {
            toast.error(`Oh no, couldn't update theme`); 
        }
    }

    if(!mounted) return <Loader /> 

    return (
        <div style={{ marginRight: '5px' }}>
            <ToggleButton 
                isPressed={state.darkMode}
                handlePress={toggleDarkMode}
                pressedElem={<MoonIcon />} 
                unpressedElem={<SunIcon />}
            /> 
        </div>
    )
}


export default DarkMode
