
import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';

import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import Auth from '../components/Auth'

import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  
  return (
    <Provider 
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ThemeProvider 
        enableSystem={true} 
        attribute="class"
      > 
        <Store>
          {Component.auth ? (
            <Auth>
              <Component  {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} /> 
          )}
        </Store>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp



// const Auth = ({ children }) => {
//   const [session, loading] = useSession()
//   const isUser = !!session?.user
  
//   useEffect(() => {
//     if (loading) return <Loader />
//     if (!isUser) signIn() // If not authenticated, force log in
//   }, [isUser, loading])

//   if (isUser) {
//     return children
//   }

//   return <Loader /> 
// }