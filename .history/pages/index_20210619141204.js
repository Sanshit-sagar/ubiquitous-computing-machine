import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import StackedLayout from '../sections/StackedLayout'
import CustomSpinner from '../buildingBlocks/Spinner'


const GreetAndLogin = () => {
    const router = useRouter()
    const [session, loading] = useSession();

    return (
      <div className="container h-full w-full bg-gray-50 border-black">
          <h2> { session && session.user ? `Welcome ${session.user.name}` : 'Log in to continue'} </h2>

          <button 
            onClick={() => router.push(session && session.user ? '/api/auth/signout' : '/api/auth/singin')}
          >
            {session && session.user ? 'Logout' : 'Login'}
          </button>
          
          <subtitle> 
            <a href='/'> I am interested </a> 
          </subtitle>
      </div>
    );
}

const Home = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    return (
      <>
        <Head>
          {/* <!-- Cloudflare Web Analytics --> */}
          <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' />
          {/* <!-- End Cloudflare Web Analytics --> */}
        </Head> 
        
        <StackedLayout 
          pageMeta={{  
            title: 'cute.ly',
            description: 'More than just another URL Shortener'
          }}
          children={loading ? <CustomSpinner /> : <GreetAndLogin />}
        />
      </>
    );
}

export default Home
