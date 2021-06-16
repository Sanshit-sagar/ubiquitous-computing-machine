import React, { Fragment } from 'react'
import { Popover } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'


import Header from './Header'
import Footer from './Footer'

// import {useSession} from 'next-auth/client'

// const user = {
//     name: '',
//     handle: '',
//     email: '',
//     imageUrl: '',
// }

// const navLinks = [
//     { title: 'Home', active: true },
//     { title: 'Profile', active: false },
//     { title: 'Resources', active: false },
//     { title: 'Company Directory', active: false },
//     { title: 'Openings', active: false },
//   ]
  
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }
  
function StackedLayout({ children }) {
    // const [session, loading] = useSession()

    return (
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                        {children}
                    </div>
                  </div>
                </section>
              </div>
  
              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                        {/* Your content */}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
            <Footer /> 
        </footer>
      </div>
    )
  }

  export default StackedLayout
