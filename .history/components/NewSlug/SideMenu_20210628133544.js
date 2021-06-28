import React from 'react'
import { Menu } from "@supabase/ui";
import { CalendarIcon, LinkIcon, BanIcon, ExternalLinkIcon, TrashIcon, LightningBoltIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';

function NewSlugNavMenu() {
    const items = [
        { id: 'basics', title: 'Basic Details', icon: <LinkIcon /> },
        { id: 'ttl', title: 'Expiration (TTL)', icon: <CalendarIcon /> },
        { id: 'password', title: 'Encryptions', icon: <LockClosedIcon /> },
        { id: 'ipBlacklists', title: 'blacklists', icon: <BanIcon /> },
        { id: 'redirects', title: 'Redirect Rules', icon: <ExternalLinkIcon /> },
        { id: 'seo', title: 'seo', icon: <LightningBoltIcon /> },
        { id: 'discard', title: 'discard', icon: <TrashIcon stroke="red" /> },
    ]

    return (
        <Menu>
            {items.map(function(item, index) {
                return (
                    
                    <div 
                        key={index}
                        className="text-black font-extralight m-2 p-2"
                    >
                        <Menu.Item
                            title={item.title}
                            icon={item.icon}
                        /> 
                    </div>
                )
            })}
        </Menu>
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