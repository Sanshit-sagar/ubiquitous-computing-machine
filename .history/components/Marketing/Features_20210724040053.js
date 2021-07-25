import React from 'react'
import { useSession } from 'next-auth/client'

import Loader from '../Loader'
import ActiveLink from '../../primitives/ActiveLink'

import { Card } from '@supabase/ui'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const Features = () => {
    const [session, loading] = useSession()
  
    const features = [
      {
        name: 'Competitive exchange rates',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: GlobeAltIcon,
        page: '/'
      },
      {
        name: 'No hidden fees',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: ScaleIcon,
        page: '/'
      },
      {
        name: 'Transfers are instant',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: LightningBoltIcon,
        page: '/'
      },
      {
        name: 'Mobile notifications',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: AnnotationIcon,
        page: '/'
      },
    ];
  
    return (
      <Card>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                    <div key={feature.name} className="relative">
                    
                        <div>
                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                              <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                              {feature.name}
                            </p>
                        </div>
        
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          {feature.description}
                        </dd>
        
                        <span>
                          {loading ? <Loader /> : <ActiveLink href={feature.page}> check it out </ActiveLink>}
                        </span>
                    </div>
                ))}
            </dl>
        </div>
      </Card> 
    );
  }

  export default Features