import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Loader from '../components/Loader'
import Layout from '../sections/Layout'

import NextSeo from 'next-seo'

const DynamicLanding = dynamic(
  () => import('../components/Landing/HeroicGreet'),
  { loading: () => <Loader />,  ssr: false } 
)

export default function HomePage() {
   
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
            <NextSeo
                title="Page Meta Title"
                description="This will be the page meta description"
                canonical="https://www.canonicalurl.ie/"
                openGraph={{
                  url: 'https://www.canonicalurl.ie/',
                  title: 'Open Graph Title',
                  description: 'Open Graph Description',
                  images: [
                    {
                      url: 'https://www.example.ie/og-image-01.jpg',
                      width: 800,
                      height: 600,
                      alt: 'Og Image Alt',
                    },
                    {
                      url: 'https://www.example.ie/og-image-02.jpg',
                      width: 900,
                      height: 800,
                      alt: 'Og Image Alt Second',
                    },
                  ],
                }}
              />
            
            <Layout 
              pageMeta={meta}
              children={
                <>
                  <DynamicLanding />
                </>
              }
            />
          </>
    );
}


