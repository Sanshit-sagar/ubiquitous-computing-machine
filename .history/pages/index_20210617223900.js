import React, {useEffect, useState, useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import { useSession, signIn, signOut } from 'next-auth/client'
import { PencilIcon } from '@heroicons/react/outline'
import StackedLayout from '../sections/StackedLayout'
import CustomSpinner from '../buildingBlocks/Spinner'

function LandingPageContent() {
  const router = useRouter()
  const [session, loading] = useSession();

  return (
      <section className="flex flex-col justify-center items-center text-center space-y-10 pt-12 sm:pt-24 md:pt-32">
        
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-7xl font-bold capitalize">
            <span className="block">
              re-hash your links
            </span>{' '}
          </h1>

          <h4 className="text-xl sm:text-2xl">
            <pre> 
              easi.ly | secure.ly | cute.ly | analytic.ly
            </pre> 
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            { session && session.user ? 
            
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
                Welcome, {session.user.name}
            </button>
          ) : (
            <Link href="/api/auth/signin">
              <a className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap flex justify-center items-center space-x-2">
                
                <span> Login </span>
              </a>
            </Link>
          )}

        </div>

        <p className="text-gray-500">
          learn more on{' '}
          <a
            href="https://screencasts.alterclass.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-gray-100 hover:text-blue-600 hover:underline"
          >
            sanshitsagar.com
          </a>
        </p>
      </section>
  );
}

const Home = () => {

  return (
    <StackedLayout 
      pageMeta={{  
        title: 'cute.ly',
        description: 'More than just another URL Shortener'
      }}
      children={<LandingPageContent />} 
    />
  )
}

export default Home