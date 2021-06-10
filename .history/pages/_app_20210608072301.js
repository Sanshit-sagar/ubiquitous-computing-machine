import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
// import {useTheme} from 'next-themes'
// import {SunIcon, MoonIcon} from '@heroicons/react'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
