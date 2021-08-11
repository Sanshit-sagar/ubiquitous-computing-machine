import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast'
import {GlobalStore} from '../../store'

import { LoadingSpinner } from '../Loader'
import ToggleButton from '../../primitives/Toggle'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const darkModeAtom = atomWithStorage('darkMode', false)

const DarkMode = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [mounted, setMounted] = useState(false)
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        setMounted(true)
    }, []); 

    const toggleDarkMode = () => {
        if(!mounted) return 

        try {
            dispatch({type: 'toggle_dark_mode'});
            setDarkMode(!darkMode)
        } catch(error) {
            toast.error(`Oh no, couldn't update theme`); 
        }
    }

    if(!mounted) return <LoadingSpinner /> 

    return (
        <div>
            <ToggleButton 
                isPressed={darkMode}
                handlePress={toggleDarkMode}
                pressedElem={<MoonIcon />} 
                unpressedElem={<SunIcon />}
            /> 
        </div>
    )
}


export default DarkMode
