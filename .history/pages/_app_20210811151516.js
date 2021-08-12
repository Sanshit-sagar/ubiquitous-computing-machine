import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';

import { SWRConfig } from 'swr'
import { Store } from '../store';
import NProgress from 'nprogress';

import { IdProvider } from '@radix-ui/react-id'
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider } from 'styled-components';
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Toaster } from 'react-hot-toast'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {

  return (
    <SSRProvider>
      <IdProvider>
        <ThemeProvider theme={theme}>
          <SWRConfig 
            value={{
              revalidateOnMount: true,
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
              refreshWhenHidden: false,
              refreshWhenOffline: false,
              refreshInterval: 50000,
              fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
          >
            <NextAuthProvider 
              options={{
                clientMaxAge: 0,
                keepAlive: 0,
              }}
              session={pageProps.session}
            >
                <Store>

                  <Component {...pageProps} />
              
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

            </NextAuthProvider>
          </SWRConfig>
        </ThemeProvider>
      </IdProvider>
    </SSRProvider>
  )
}

export default MyApp