import React from 'react'
import { Menu } from "@supabase/ui";
import { CalendarIcon, LinkIcon, BanIcon, ExternalLinkIcon, TrashIcon, LightningBoltIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';

function NewSlugNavMenu() {
    const items = [
        { id: 'basics', title: 'Basic Details', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'ttl', title: 'Time To Live', icon: <CalendarIcon className="h-6 w-6" stroke="green" /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" stroke="gold" /> },
        { id: 'ipBlacklists', title: 'IP Blacklists', icon: <BanIcon className="h-6 w-6" stroke="black" /> },
        { id: 'redirects', title: 'Routing Rules', icon: <ExternalLinkIcon className='h-6 w-6' stroke="blue" />},
        { id: 'seo', title: 'SEO', icon: <LightningBoltIcon className='h-6 w-6' stroke="yellow" />},
        { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' stroke='red' /> },
    ]

    return (
       
            <Menu className='w-full h-full' style={{ width: '175px' }}>
                {items.map(function(item, index) {
                    return (
                        <div key={index} className='w-full bg-red'>
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