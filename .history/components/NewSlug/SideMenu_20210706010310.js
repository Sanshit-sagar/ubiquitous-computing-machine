import React, { useContext } from 'react'
import { NewSlugStore } from '../../store' 
import { Menu } from "@supabase/ui";
import { 
    CalendarIcon, 
    LinkIcon, 
    BanIcon, 
    ExternalLinkIcon, 
    TrashIcon, 
    LightningBoltIcon,
    CursorClickIcon, 
    LockClosedIcon
} from '@heroicons/react/outline';


function NewSlugNavMenu() {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleTabChange = (event, itemId) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'currentTab',
                value: itemId
            }
        }); 
    }

    const items = [
        { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'slug', title: 'Custom Slug', icon: <CursorClickIcon className="h-6 w-6" stroke="pink" /> },
        { id: 'ttl', title: 'Time To Live', icon: <CalendarIcon className="h-6 w-6" stroke="green" /> },
        { id: 'seo', title: 'SEO Tags', icon: <LightningBoltIcon className='h-6 w-6' stroke="yellow" />},
        { id: 'blacklists', title: 'IP Blacklists', icon: <BanIcon className="h-6 w-6" stroke="black" /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" stroke="gold" /> },
        { id: 'redirects', title: 'Routing Rules', icon: <ExternalLinkIcon className='h-6 w-6' stroke="blue" />},
        { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' stroke='red' /> },
    ]

    return (
        <Menu className='w-full h-full m-0'>
            <Menu.Group title="Actions" />

            <> {items.map(function(item, index) {
                return (
                    <div 
                        key={index} 
                        className='w-full bg-red'
                    >
                        <Menu.Item 
                            icon={item.icon} 
                            showActiveBar 
                            active={state.currentTab===item.id}
                            onClick={(event) => {
                                    handleTabChange(event, item.id)
                                }
                            }
                        >
                            {item.title} 
                        </Menu.Item> 
                    </div>
                )
            })} </>
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