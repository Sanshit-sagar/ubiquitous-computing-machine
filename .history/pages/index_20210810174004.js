import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Loader from '../components/Loader'
import Layout from '../sections/Layout'

const DynamicLanding = dynamic(
  () => import('../components/Landing/HeroicGreet'),
  { loading: () => <Loader />,  ssr: false } 
)

export default function HomePage({ metadata }) {
   
    return (
        <>
            <Head>
                <title> analytic.ly </title>
                <meta 
                  property="og:title" 
                  content="analyticly" 
                  key="title" 
                />
                <meta 
                  name="viewport" 
                  content="initial-scale=1.0, width=device-width" 
                />
                
                <script 
                  defer 
                  src='https://static.cloudflareinsights.com/beacon.min.js' 
                  data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' 
                />
                
                <link 
                  rel="stylesheet" 
                  href="https://develop.modulz.app/fonts/fonts.css" 
                />
                
            </Head> 
           
            <Layout 
              metadata={metadata}
              children={ <DynamicLanding /> }
            />
        </>
    );
}



HomePage.defaultProps = {
  metadata: {
      title: 'HomePage',
      description: 'Visualizes key metrics'
  }
}