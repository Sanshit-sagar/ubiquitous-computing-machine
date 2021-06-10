import Link from 'next/link';
import { useSession, signIn } from 'next-auth/client';

import { BookOpenIcon, PencilIcon } from '@heroicons/react/outline';
import { Layout } from '@/sections/index';

function Home() {
  const [session, loading] = useSession();

  return (
    <Layout>
      <section className="flex flex-col justify-center items-center text-center space-y-10 pt-12 sm:pt-24 md:pt-32">
        
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-7xl font-bold capitalize">
            <span className="block">link management for developers</span>{' '}
          </h1>
          <subtitle>
            <span className="block"> easi.ly | secure.ly | cute.ly | analytic.ly </span>
          </subtitle>

          <h2 className="text-xl sm:text-2xl">
            The one stop shop for all your Link Management needs
          </h2>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {loading ? null : !session?.user ? (
            <button
              type="button"
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
              Start your blog for free
            </button>
          ) : (
            <Link href="/new">
              <a className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap flex justify-center items-center space-x-2">
                <PencilIcon className="w-6 h-6 flex-shrink-0" />
                <span> Create your own </span>
              </a>
            </Link>
          )}

          <Link href="/posts">
            <a className="w-full bg-transparent text-blue-600 px-6 py-3 rounded-md text-lg sm:text-xl border-2 border-blue-600 focus:outline-none whitespace-nowrap flex justify-center items-center space-x-2">
              <BookOpenIcon className="w-6 h-6 flex-shrink-0" />
              <span> View public Links </span>
            </a>
          </Link>
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
    </Layout>
  );
}

export default Home