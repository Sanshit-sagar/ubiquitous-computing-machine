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
// import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Toaster } from 'react-hot-toast'
import { blue, green, yellow, red } from '@radix-ui/colors';


import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// TODO: Finish Integrating this!
// export function reportWebVitals(metric) {
//   const body = JSON.stringify(metric)
//   const url = 'https://api.logflare.app/logs/json?source=1d8461ad-f119-4e33-a081-3e2dd7bc41c8'

//   if (navigator.sendBeacon) {
//     navigator.sendBeacon(url, body)
//   } else {
//     fetch(url, { body, method: 'POST', keepalive: true })
//   }
// }

//////////////

  const theme = {
    ...blue,
    ...green,
    ...yellow,
    ...red,

    accent1: blue.blue1,
    accent2: blue.blue2,
    accent3: blue.blue3,
    accent4: blue.blue4,
    accent5: blue.blue5,
    accent6: blue.blue6,
    accent7: blue.blue7,
    accent8: blue.blue8,
    accent9: blue.blue9,
    accent10: blue.blue10,
    accent11: blue.blue11,
    accent12: blue.blue12,

    success1: green.green1,
    success2: green.green2,
    // repeat for all steps

    warning1: yellow.yellow1,
    warning2: yellow.yellow2,
    // repeat for all steps

    danger1: red.red1,
    danger2: red.red2,
    // repeat for all steps
};



function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   const handleRouteChangeError = (err, url) => {
  //     if (err.cancelled) {
  //       console.log(`Route to ${url} was cancelled!`)
  //     }
  //   }

  //   router.events.on('routeChangeError', handleRouteChangeError)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeError', handleRouteChangeError)
  //   }
  // }, [])

  return (
    <SSRProvider>
      <IdProvider>
        <ThemeProvider theme={theme}>
          <SWRConfig 
            value={{
              revalidateOnMount: true,
              revalidateOnFocus: true,
              revalidateOnReconnect: true,
              refreshWhenHidden: false,
              refreshWhenOffline: false,
              refreshInterval: 5000,
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