import React from 'react'
import Head from 'next/head'

import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'
import ActiveLink from '../buildingBlocks/ActiveLink'

import { Card, Button } from '@supabase/ui'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
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

const Features = () => {
  const [session, loading] = useSession()

  const features = [
    {
      name: 'Competitive exchange rates',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: GlobeAltIcon,
      page: '/'
    },
    {
      name: 'No hidden fees',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: ScaleIcon,
      page: '/'
    },
    {
      name: 'Transfers are instant',
      description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: LightningBoltIcon,
      page: '/'
    },
    {
      name: 'Mobile notifications',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: AnnotationIcon,
      page: '/'
    },
  ];

  return (
    <Card>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                      {feature.description}
                  </dd>
                  <>
                    {session && session?.user ? (
                        <ActiveLink href={feature.page}>
                          check it out
                        </ActiveLink>)
                      : loading ? <Loader /> 
                      : null
                    }
                  </>
                </div>
              ))}
            </dl>
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
              <Features /> 
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


