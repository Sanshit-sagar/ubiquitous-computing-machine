import '../styles/globals.css'
import '@tailwindcss'

import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    // </AuthProvider>
  )
}

export default MyApp
