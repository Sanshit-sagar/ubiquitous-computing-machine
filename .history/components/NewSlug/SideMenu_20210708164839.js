import React, { useContext } from 'react'
import { NewSlugStore } from '../../store' 
import { Menu } from "@supabase/ui";
import { 
    CalendarIcon, 
    LinkIcon, 
    BanIcon, 
    ExternalLinkIcon, 
    TrashIcon, 
    BeakerIcon, 
    PauseIcon,
    DatabaseIcon, 
    SocialLinkIcon, 
    CursorClickIcon, 
    LockClosedIcon
} from '@heroicons/react/outline';
import { DocumentDuplicateIcon, SpeakerphoneIcon, UserGroupIcon } from '@heroicons/react/solid';


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

    const details = [
        { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'brand / slug', title: 'Customization', icon: <CursorClickIcon className="h-6 w-6" /> },
        { id: 'expiration', title: 'Expiration', icon: <CalendarIcon className="h-6 w-6"  /> },
    ]; 

    const analytics = [
        { id: 'seo', title: 'SEO Params', icon: <UserGroupIcon className='h-6 w-6' />},
        { id: 'utm', title: 'Campaign', icon: <SpeakerphoneIcon className='h-6 w-6' />},
        { id: 'abtests', title: 'A/B Tests', icon: <BeakerIcon className='h-6 w-6' />}
    ];
      
    const flags = [ 
        { id: 'blacklists', title: 'Blacklists', icon: <BanIcon className="h-6 w-6"  /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" /> },
        { id: 'ratelimits', title: 'Encryption', icon: <PauseIcon className="h-6 w-6"  /> },
        { id: 'redirects', title: 'Redirects', icon: <ExternalLinkIcon className='h-6 w-6' />},
        { id: 'cache', title: 'Cache', icon: <DatabaseIcon className='h-6 w-6' />}
    ]; 

    const actions = [
        { id: 'share', title: 'Share', icon: <SocialLinkIcon className='h-6 w-6' /> },
        { id: 'duplicate', title: 'Duplicate', icon: <DocumentDuplicateIcon className='h-6 w-6' /> },
        { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' /> }
    ];

    const items = [
        { index: 0, content: [...details], title: 'Details'},
        { index: 1, content: [...analytics], title: 'Analytics'},
        { index: 2, content: [...flags], title: 'Feature Flags'},
        { index: 3, content: [...actions], title: 'Actions'}
    ]; 

    return (
        <Menu className='w-full h-full mr-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white'>
            {items.map((item, i) => {
                return (
                    <Menu.Group key={i} title={item.title}>
                        {items[i].content.map(function(value, j) {
                            return (
                                <Menu.Item 
                                    key={j}
                                    icon={value.icon}
                                    showActiveBar
                                    active={state.currentTab===value.id}
                                    onClick={(e) => handleTabChange(e)}
                                >
                                    <span className="text-md font-extralight text-black"> 
                                        {value.title} 
                                    </span>
                                </Menu.Item>
                            );
                        })} 
                    </Menu.Group>
                );
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