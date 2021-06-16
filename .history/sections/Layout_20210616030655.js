
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/client'
// import PageViewsStats from '../components/Stats/index'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const SITE_DOMAIN = 'TODO';

// const stats = [
//     { label: 'Vacation days left', value: 12 },
//     { label: 'Sick days left', value: 4 },
//     { label: 'Personal days left', value: 2 },
// ]

function PageHeader() {
  return (
    <div>
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <a href="#" className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
            <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
            Back
          </a>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <a href="#" className="text-sm font-medium text-gray-400 hover:text-gray-200">
                    Jobs
                  </a>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                <a href="#" className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">
                  Engineering
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                <a href="#" aria-current="page" className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">
                  Back End Developer
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Back End Developer
          </h2>
        </div>
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
                    <PageHeader /> 
                    {children}
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Layout 