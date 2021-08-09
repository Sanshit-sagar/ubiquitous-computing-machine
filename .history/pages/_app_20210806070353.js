import '../styles/globals.css';
import '../styles/nprogress.css';

import React, { useContext } from 'react';
import Router from 'next/router';

import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import NProgress from 'nprogress';
import { GlobalStore } from '../store'

import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

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

import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  slate, black, violet,
  slateDark, blackDark, violetDark
} from '@radix-ui/colors';

const theme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...slate,
    ...black,
    ...violet,
  },
};
const darkTheme = {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...slateDark,
    ...blackDark,
    ...violetDark,
  },
};

function MyApp({ Component, pageProps }) {
  const state = useContext(GlobalStore.State);
  
  let darkMode = false;
  if(window!==undefined) {
    darkMode = state.darkMode;
  }

  return (
      <>
        <SWRConfig 
          value={{
            refreshInterval: 15000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <Provider 
            options={{
              clientMaxAge: 0,
              keepAlive: 0,
            }}
            session={pageProps.session}
          >
            <ThemeProvider theme={darkMode ? darkTheme : theme}> 
            {/* enableSystem={true} attribute="class" */}
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
            </ThemeProvider>
          </Provider>
        </SWRConfig>
      </>
  )
}

export default MyApp