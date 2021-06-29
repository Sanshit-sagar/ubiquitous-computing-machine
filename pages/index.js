import React from 'react'
import Head from 'next/head'

import { useSession } from 'next-auth/client'

import AuthButton from '../components/Auth/AuthButton'
import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

const emphasize = (needsEmph) => {
  return (
    <span className="text-brand-700"> 
      {needsEmph}
    </span> 
  );
}

const Greeting = () => {
  const [session, loading] = useSession()

  if(loading) return <Loader />
  if(session && session?.user) return  <span className="text-md text-white font-extralight"> Hi, {session.user.name} </span>;
  return null //`Login to continue`
}

const LandingPage = () => {

    return (
      <div className="flex flex-col min-h-screen items-center relative overflow-y-hidden">
        <div className="absolute top-8 sm:-top-16 -left-40 sm:-left-36 xl:-left-36 w-full sm:w-2/3 transform rotate-6  shadow-xl"/>
        <div className="min-h-screen sm:min-h-full lg:min-h-screen items-center sm:py-0 grid grid-cols-12 gap-x-4 container px-10 sm:px-20 xl:px-28 mx-auto z-10 flex-col-reverse sm:my-56 lg:my-0">
          <div className="row-start-2 lg:row-start-1 col-span-12 lg:col-span-6 relative">
            
            <div className="mb-10">
              <div className="flex items-center mb-5">
                <h1 className="text-gray-700 text-3xl xl:text-5xl leading-snug">
                  Get {emphasize("realtime insights")} into your URLs
                </h1>
              </div>

              <p className="text-gray-900 sm:w-auto text-lg xl:text-xl">
                making URL Analytics {emphasize("edgy")} again
              </p>
            </div>

            <div className="mb-10">
              <div className="container h-full w-full">
                <Greeting /> 
                <AuthButton /> 
              </div>
            </div>

          </div>
        </div>
      </div>
    );
}

  
const HomePage = ({ meta }) => {
   
    return (
      <>
        <Head>
          <title> cute.ly </title>
          <meta property="og:title" content="cutely" key="title" />
          <script defer  src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' />
          <link href="https://fonts.googleapis.com/css?family=Inter&display=swap" rel="stylesheet" />
        </Head> 
        
        <StackedLayout 
          pageMeta={meta}
          children={<LandingPage />}
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


