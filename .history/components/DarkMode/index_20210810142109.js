import React, { useState, useEffect, useContext } from 'react';
import {GlobalStore} from '../../store'

import ToggleButton from '../../primitives/Toggle'
import { LoadingSpinner } from '../Loader'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import uiStateAtom from '../../store/atoms'
import { useAtom } from 'jotai'

import toast from 'react-hot-toast'

const DarkMode = ({ darkMode, toggleDarkMode }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []); 

    const handleToggleDarkMode = () => {
        if(!mounted) return 

        try {
            toggleDarkMode();
        } catch(error) {
            toast.error(`Oh no, couldn't update theme`); 
        }
    }

    if(!mounted) return <LoadingSpinner /> 

    return (
        <div>
            <ToggleButton 
                isPressed={darkMode}
                handlePress={handleToggleDarkMode}
                pressedElem={<MoonIcon />} 
                unpressedElem={<SunIcon />}
            /> 
        </div>
    )
}


export default DarkMode
