
import '../styles/globals.css';
import '../styles/nprogress.css';

import Router from 'next/router';
import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  const { user } = pageProps;


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
        <Store>
          <Component  {...pageProps} />
        </Store>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp


{/*  */}

// const [loaded, setLoaded] = useState(false)
// // `/api/slugs/aliases/${uid}`
// const [slugs, setSlugs] = useState([])
// const [selectedSlugs, setSelectedSlugs] = useState([])
// const [clickEventRetrievers, setClickEventRetrievers] = useState({})

// const references = {
//   clicks: useRef(null),
// }


// const toggleSlug = (slugName) => {
//   let updatedSelectedSlugs = selectedSlugs.slice()
//   if (selectedSlugs.indexOf(slugName) !== -1) {
//     updatedSelectedSlugs = updatedSelectedSlugs.filter(slug => slug !== slugName)
//   } else {
//     updatedSelectedSlugs.push(slugName)
//   }
//   setSelectedSlugs(updatedSelectedSlugs)
// }

// const toggleAllSlugs = () => {
//   if (selectedSlugs.length === slugs.length) {
//     setSelectedSlugs([])
//   } else {
//     setSelectedSlugs(slugs.map(slug => `${slug}`))
//   }
// }