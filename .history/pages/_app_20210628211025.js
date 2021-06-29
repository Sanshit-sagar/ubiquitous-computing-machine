
import '../styles/globals.css';
import '../styles/nprogress.css';

import Router from 'next/router';
import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'
import AuthWrapper from '../components/Auth/index'
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  
  return (
    <AuthProvider 
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
            {
              Component.auth ?
                <AuthWrapper>
                    <Store>
                      <Component  {...pageProps} />
                    </Store>
                </AuthWrapper>
              : 
                <Store>
                  <Component {...pageProps} /> 
                </Store>
            }
        </Store>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
