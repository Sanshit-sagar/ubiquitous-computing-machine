
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/client'
// import PageViewsStats from '../components/Stats/index'

const SITE_DOMAIN = 'TODO';

export default function CardHeading() {
    return (
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Job Postings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create new job
            </button>
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

                <main className="flex-grow container mx-auto px-4 sm:px-6">
                    <CardHeading /> 
                    {children}
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Layout 