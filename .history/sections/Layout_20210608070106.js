
import Head from 'next/head'
import {useRouter} from 'next/router'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, pageMeta }) => {
    const router = useRouter()

    const meta = {
        title: 'The Blogging Platform For Developers',
        description: `Start your developer blog, share ideas, and connect with the dev community!`,
        type: 'website',
        creator: '@AlterClassIO',
        ...pageMeta,
    };

    return (   
        
    <>
        <Head>
            <title> {meta.title} </title>
        </Head>


        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 sm:px-6">
                {children}
            </main>

            <Footer />
        </div>

    </>
    )
}

export default Layout 