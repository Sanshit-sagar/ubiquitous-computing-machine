
import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';

import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'

import AuthListener from '../components/Auth/AuthListener'

import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  
  return (
    <SWRConfig 
      value={{
        refreshInterval: 6000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            toast.error(`uh oh... ${key} says ${error.message}`)
          }
        }
      }}
    >
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
              <AuthListener>
                <Component  {...pageProps} />
              </AuthListener>
            ) : (
              <Component {...pageProps} /> 
            )}

            <Toaster
              toastOptions={{
                success: {
                  style: {
                    background: 'green',
                  },
                },
                error: {
                  style: {
                    background: 'red',
                  },
                },
              }}
            />

          </Store>
        </ThemeProvider>
      </Provider>
    </SWRConfig>
  )
}

export default MyApp