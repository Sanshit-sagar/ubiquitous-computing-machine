
import '../styles/globals.css';
import '../styles/nprogress.css';

import React from 'react';
import Router from 'next/router';
import axios from 'axios'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'

import NProgress from 'nprogress';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import { Store } from '../store'



const fetcher = (url, data) =>
  axios.post(url, data).then((res) => {
      console.log(res);
      return res.data;
  });

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