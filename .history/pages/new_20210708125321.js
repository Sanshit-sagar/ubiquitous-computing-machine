import React from 'react'
import { useSession } from 'next-auth/client'

import { Card } from '@supabase/ui'
import StackedLayout from '@/sections/StackedLayout'
import NewSlug from '@/components/NewSlug'

const NewLinkCard = () => {
  const payments = [
    {
      id: 1,
      date: '1/1/2020',
      datetime: '2020-01-01',
      description: 'Business Plan - Annual Billing',
      amount: 'CA$109.00',
      href: '#',
    },
    {
      id: 1,
      date: '1/1/2020',
      datetime: '2020-01-01',
      description: 'Business Plan - Annual Billing',
      amount: 'CA$109.00',
      href: '#',
    },
  ]; 

  return (
    <Card>
    <section aria-labelledby="billing-history-heading">
    <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 sm:px-6">
        <h2 id="billing-history-heading" className="text-lg leading-6 font-medium text-gray-900">
          Create New URL Slug
        </h2>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    
                    <th
                      scope="col"
                      className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span className="sr-only">View receipt</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <time dateTime={payment.datetime}>{payment.date}</time>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.description}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={payment.href} className="text-orange-600 hover:text-orange-900">
                          View receipt
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </Card>
  )
}

const NewLinkPage = () => {
  // const [session] = useSession()
  // const email = session && session?.user ? session.user.email : ''
  const email = 'sasagar@ucsd.edu'

  return (
      <StackedLayout 
          pageMeta={{ 
            title: 'Create a new Slug',
            href: '/new' 
          }} 
          children={
            <NewLinkCard email={email} />
          }
      />
  );
};


export default NewLinkPage 

NewLinkPage.auth = false; 