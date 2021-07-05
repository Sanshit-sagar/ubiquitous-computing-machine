import React, { useContext, useState } from 'react'
import { Menu } from "@supabase/ui";
import { GlobalStore } from '../../store' 

import { 
    CalendarIcon, 
    LinkIcon, 
    BanIcon, 
    ExternalLinkIcon, 
    TrashIcon, 
    LightningBoltIcon 
} from '@heroicons/react/outline';
import {  
    CursorClickIcon, 
    LockClosedIcon,
} from '@heroicons/react/outline';

function NewSlugNavMenu() {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const handleTabChange = (event, itemId) => {
        dispatch({
            type: 'change_tabs',
            payload: {
                value: itemId
            }
        }); 
    }

    const items = [
        { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'slug', title: 'Custom Slug', icon: <CursorClickIcon className="h-6 w-6" stroke="pink" /> },
        { id: 'ttl', title: 'Time To Live', icon: <CalendarIcon className="h-6 w-6" stroke="green" /> },
        { id: 'seo', title: 'SEO', icon: <LightningBoltIcon className='h-6 w-6' stroke="yellow" />},
        { id: 'ipBlacklists', title: 'IP Blacklists', icon: <BanIcon className="h-6 w-6" stroke="black" /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" stroke="gold" /> },
        { id: 'redirects', title: 'Routing Rules', icon: <ExternalLinkIcon className='h-6 w-6' stroke="blue" />},
        { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' stroke='red' /> },
    ]

    return (
            <> 
                <p className="text-black text-md font-extralight"> 
                    {/* {state.currentTab}  */}
                    YOYOYO
                </p>
                <Menu 
                    className='w-full h-full' 
                    style={{ width: '150px' }}
                >
                    {items.map(function(item, index) {
                        return (
                            <div 
                                key={index} 
                                className='w-full bg-red'
                            >
                                <Menu.Item 
                                    icon={item.icon} 
                                    showActiveBar 
                                    active={state.currentTab===item.id}
                                >
                                    <button 
                                        onClick={(event) => {
                                            handleTabChange(event, item.id)
                                        }
                                    }
                                        className='text-gray-700 font-extralight text-md'
                                    >
                                        {item.title} 
                                    </button>
                                </Menu.Item> 
                            </div>
                        )
                    })}
                </Menu>
            </>
       
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