import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/client'
// import PageViewsStats from '../components/Stats/index'

const SITE_DOMAIN = 'TODO';

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
            </Head>


            <div className="min-h-screen flex flex-col f">
                
                <Header />

                {/* <ViewershipStats /> */}

                <main className="flex-grow container mx-auto px-4 sm:px-6">
                    {children}
                </main>

                <Footer />
            </div>
        </>
    )
}

export default Layout 