import React, { useState, useEffect, useContext } from 'react';
import {GlobalStore} from '../../store'

import ToggleButton from '../../primitives/Toggle'
import { LoadingSpinner } from '../Loader'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import uiStateAtom from '../../store/atoms'
import { useAtom } from 'jotai'

import toast from 'react-hot-toast'

const DarkMode = () => {
    const [mounted, setMounted] = useState(false)
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    useEffect(() => {
        setMounted(true)
    }, []); 

    const toggleDarkMode = () => {
        if(!mounted) return 

        try {
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
