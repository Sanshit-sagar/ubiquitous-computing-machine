import '@/styles/globals.css';
import '@/styles/nprogress.css';

import Router from 'next/router';

import { Store } from '../store';
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
        <Store>
          <Component {...pageProps} />
          <Toaster 
            position="bottom-left" 
            reverseOrder={true} 
          /> 
        </Store>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
