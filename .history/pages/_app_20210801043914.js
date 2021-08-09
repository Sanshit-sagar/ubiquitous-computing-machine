import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';

import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import NProgress from 'nprogress';

import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr';

import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export function reportWebVitals(metric) {
  const body = JSON.stringify(metric)
  const url = 'https://api.logflare.app/logs/json?source=1d8461ad-f119-4e33-a081-3e2dd7bc41c8'

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

function MyApp({ Component, pageProps }) {
  
  return (
    <SSRProvider>
      <IdProvider>
        <SWRConfig 
          value={{
            refreshInterval: 15000,
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
            <GlobalLayout>
              <ThemeProvider enableSystem={true} attribute="class"> 
                <Store>
                  <Component  {...pageProps} />

                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                      style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                      },
                      iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                      },
                    }}
                  />
                </Store>
              </ThemeProvider>
            </GlobalLayout>
            
          </Provider>
        </SWRConfig>
      </IdProvider>
    </SSRProvider>
  )
}

export default MyApp