import React from 'react'
import Head from 'next/head'

import Loader from '../components/Loader'
import AuthButton from '../components/Auth/AuthButton'
import StackedLayout from '../sections/StackedLayout'
import { useSession } from 'next-auth/client'

const Greeting = () => {
  const [session, loading] = useSession()

  if(loading) return <Loader />

  if(session && session?.user) {
    return  ( 
      <span className="text-md text-white font-extralight"> 
        Hi, {session.user.name}  
      </span> 
    )
  } else {
    return <AuthButton /> 
  }
}

  
const HomePage = ({ meta }) => {
   
    return (
      <>
        <Head>
          <title> cute.ly </title>
          <meta property="og:title" content="cutely" key="title" />
          
          <script 
            defer 
            src='https://static.cloudflareinsights.com/beacon.min.js' 
            data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' 
          />

          <script src="ua-parser.min.js"></script>
          
          <link 
            href="https://fonts.googleapis.com/css?family=Inter&display=swap" 
            rel="stylesheet" 
          />
        </Head> 
        
        <StackedLayout 
          pageMeta={meta}
          children={<Greeting />}
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


