import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

const FeaturesCard = dynamic(
  () => import('../components/Marketing/Features'),
  { loading: () => <Loader /> }
)

import { Card, Button } from '@supabase/ui'
import { LoginIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'

const Greeting = () => {
  const [session, loading] = useSession()

  if(loading) return <Loader />

  if(session && session?.user) {
    return  ( 
      <span className="text-md text-white font-extralight"> 
        Hi there, {session.user.name}  
      </span> 
    )
  } 
}

const CallToAction = () => {
  const [session, loading] = useSession()

  return (
      <Card>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">
                Web analytics delivered from the edge
              </span>
              <span className="block text-pink-700">
                cute.ly, secure.ly, analytic.ly, 
              </span>
            </h2>

            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="m-3 inline-flex rounded-md shadow">
                {
                    session && session.user ? <Greeting /> 
                  : loading ? <Loader /> 
                  :
                    <Button
                      type="outline"
                      iconRight={<LoginIcon className="-ml-1 mr-2 h-5 w-5" />}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-md text-lg font-extralight rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      onClick={() => {
                        router.push('/api/auth/signin')
                      }}
                    >
                      
                        Login
                    </Button>
                }
              </div>
            </div>
          </div>
      </Card>
  );
}

  
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
          
          <link 
            href="https://fonts.googleapis.com/css?family=Inter&display=swap" 
            rel="stylesheet" 
          />
        </Head> 
        
        <StackedLayout 
          pageMeta={meta}
          children={
            <>
              <CallToAction />
              <FeaturesCard /> 
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


