
import Head from 'next/head'
import {useRouter} from 'next/router'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, pageMeta }) => {
    const router = useRouter()

    const meta = {
        title: 'codex',
        description: `the one stop shop for all your url management needs`,
        type: 'website',
        creator: 'sanshit.sagar@gmail.com',
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