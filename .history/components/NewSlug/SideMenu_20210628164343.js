import React from 'react'
import { Menu } from "@supabase/ui";
import { CalendarIcon, LinkIcon, BanIcon, ExternalLinkIcon, TrashIcon, LightningBoltIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';

function NewSlugNavMenu() {
    const items = [
        { id: 'basics', title: 'Basic Details', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'ttl', title: 'Expiration (TTL)', icon: <CalendarIcon className="h-6 w-6" stroke="pink" /> },
        { id: 'password', title: 'Expiry', icon: <LockClosedIcon className="h-6 w-6" stroke="black" /> },
        { id: 'ipBlacklists', title: 'IP Blacklists', icon: <BanIcon className="h-6 w-6" stroke="red" /> },
        { id: 'redirects', title: 'Routing Rules', icon: <ExternalLinkIcon className='h-6 w-6' stoke="blue" />},
        { id: 'seo', title: 'SEO', icon: <LightningBoltIcon className='h-6 w-6' stroke="yellow" />},
        { id: 'discard', title: 'Discard/Delete', icon: <TrashIcon className='h-6 w-6' stroke='red' /> },
    ]

    return (
       
            <Menu className='w-full h-full'>
                {items.map(function(item, index) {
                    return (
                        <div key={index} className='w-full'>
                            <Menu.Item icon={item.icon}>
                                <span className='text-gray-700 font-extralight text-md'> 
                                    {item.title} 
                                </span>
                            </Menu.Item> 
                        </div>
                    )
                })}
            </Menu>
       
    );
  }
  

const SideMenuComponent = () => {

    return (
        <div className='flex-col justify-start align-start m-2 p-2 mr-5'>
            <NewSlugNavMenu />
        </div>  
    )
}

export default SideMenuComponent