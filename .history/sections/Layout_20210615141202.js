
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/client'
// import PageViewsStats from '../components/Stats/index'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const SITE_DOMAIN = 'TODO';

function CardHeading() {
    const [session, loading] = useSession()

    return (
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div className="bg-white p-6">
            { session.user ? 
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img className="mx-auto h-20 w-20 rounded-full" src={session.user.image} alt="" />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">{session.user.name}</p>
                  <p className="text-sm font-medium text-gray-600">{session.user.email}</p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <a
                  href="#"
                  className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View profile
                </a>
              </div>
            </div> : null}
          </div>
          <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )
}

const Layout = ({ children, pageMeta }) => {
    const router = useRouter()

    const meta = {
        title: 'hashify',
        description: `the one stop shop for all your url management needs`,
        type: 'website',
        creator: 'sanshit.sagar@gmail.com',
        ...pageMeta,
    };

    return (   
        <>
            <Head>
                <title> {meta.title} </title>
                <meta content={meta.description} name="description" />
                <meta property="author" content="AlterClass" />
                <link rel="canonical" href={`${SITE_DOMAIN}${router.asPath}`} />
                
                {/* Open Graph */}
                <meta property="og:url" content={`${SITE_DOMAIN}${router.asPath}`} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="hashify" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                {meta.image && <meta property="og:image" content={meta.image} />}
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@AlterClassIO" />
                <meta name="twitter:creator" content={meta.creator} />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                {meta.image && <meta name="twitter:image" content={meta.image} />}

                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>


            <div className="min-h-screen flex flex-col f">
                
                <Header />

                {/* <ViewershipStats /> */}

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CardHeading /> 
                    {children}
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Layout 