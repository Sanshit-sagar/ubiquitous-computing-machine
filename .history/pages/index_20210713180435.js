import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

import { styled } from '../stiches.config'

const FeaturesCard = dynamic(
  () => import('../components/Marketing/Features'),
  { loading: () => <Loader /> }
)

const CallToAction = dynamic(
  () => import('../components/Marketing/CallToAction'),
  { loading: () => <Loader />,  ssr: false } 
)

// const Text = styled('p', {
//   fontFamily: '$system',
//   color: '$hiContrast',

//   variants: {
//     size: {
//       1: {
//         fontSize: '$1',
//       },
//       2: {
//         fontSize: '$2',
//       },
//       3: {
//         fontSize: '$3',
//       },
//     },
//   },
// });

const HomePage = ({ meta }) => {
   
    return (
      <>
        <Head>
          <title> analytic.ly </title>
          <meta property="og:title" content="analyticly" key="title" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script 
            defer 
            src='https://static.cloudflareinsights.com/beacon.min.js' 
            data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' 
          />
        </Head> 
        
        <StackedLayout 
          pageMeta={meta}
          children={
            <>
              <CallToAction />
              {/* <FeaturesCard />  */}
            </>
          }
        />

      </>
    );
}

export default HomePage 

HomePage.defaultProps = {
  meta: {
    title: 'cute.ly',
    description: 'More than just another URL Shortener'
  }
}


