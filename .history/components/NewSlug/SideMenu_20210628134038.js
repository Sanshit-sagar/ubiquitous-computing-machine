import React from 'react'
import { Menu } from "@supabase/ui";
import { CalendarIcon, LinkIcon, BanIcon, ExternalLinkIcon, TrashIcon, LightningBoltIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';

function NewSlugNavMenu() {
    const items = [
        { id: 'basics', title: 'Basic Details', icon: <LinkIcon className="h-6 w-6"/> },
        { id: 'ttl', title: 'Expiration (TTL)', icon: <CalendarIcon className="h-6 w-6"/> },
        { id: 'password', title: 'Encryptions', icon: <LockClosedIcon className="h-6 w-6" /> },
        { id: 'ipBlacklists', title: 'IP Blacklists', icon: <BanIcon className="h-6 w-6"/> },
        { id: 'redirects', title: 'Routing Rules', icon: <ExternalLinkIcon className="h-6 w-6" /> },
        { id: 'seo', title: 'SEO Parameters', icon: <LightningBoltIcon className="h-6 w-6"/> },
        { id: 'discard', title: 'Discard/Delete', icon: <TrashIcon stroke="red" className="h-6 w-6" /> },
    ]

    return (
        <div className="w-full">
            <Menu className="w-full h-full">
                {items.map(function(item, index) {
                    return (
                        <div key={index}>
                            <Menu.Item icon={item.icon}>
                                {item.title}
                            </Menu.Item> 
                        </div>
                    )
                })}
            </Menu>
        </div>
    );
  }
  

const SideMenu = () => {

    return (
        <div className="flex-col justify-start align-start m-2 p-2 mr-5">

            <NewSlugNavMenu />
        </div>  
    )
}

export default SideMenu