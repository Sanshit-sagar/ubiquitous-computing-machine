import Logo from '../components/Logo'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { useSession, signIn } from 'next-auth/client'
// const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

const Header = () => {
    const [systemTheme, theme, setTheme] = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if(!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme; 
            
        if(currentTheme==='dark') {
            return (
                <SunIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('light')} 
                />
            );
        } else {
            return (
                <MoonIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('dark')} 
                />
            );
        }
    }


    return (
        <header className="border-b border-gray-100 dark:border-gray-700">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">

                <Logo /> 

                {renderThemeChanger()}
            </div>
        </header>
    )
}

export default Header 