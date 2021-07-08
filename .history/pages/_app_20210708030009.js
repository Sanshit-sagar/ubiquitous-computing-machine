
import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';

import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import AuthListener from '../components/Auth/AuthListener'

import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
// Axios.defaults.withCredentials = true;

const fetcher = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};


function MyApp({ Component, pageProps }) {
  
  return (
    <SWRConfig
      value={{
          fetcher,
          dedupingInterval: 10000,
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
        </Store>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp