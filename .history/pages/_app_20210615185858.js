import '@/styles/globals.css';
import '@/styles/nprogress.css';
import {GlobalStore} from '../store';

import Router from 'next/router';
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <GlobalStore>
          <Component {...pageProps} />
          <Toaster /> 
        </GlobalStore>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
