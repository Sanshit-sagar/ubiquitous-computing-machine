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

import { IdProvider } from '@radix-ui/react-id'

import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  
  return (
    <>
    <IdProvider>
      <SWRConfig 
        value={{
          refreshInterval: 2500,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
          onError: (error, key) => {
            // update UI, send logs, wait 5 secs then retry up to 10 times
            if (error.status !== 403 && error.status !== 404) {
              // toast.error(`uh oh... ${key} says ${error.message}`)
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
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  success: {
                    theme: {
                      primary: 'green',
                      secondary: 'black',
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
      </IdProvider>
    </>
  )
}

export default MyApp