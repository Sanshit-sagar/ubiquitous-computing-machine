
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/client';

import toast from 'react-hot-toast';
import axios from 'axios'
import useSWR from 'swr'

import SideMenu from './SideMenu'
import TagManager from './TagManager'
import BlacklistInputContent from './BlacklistInputContent'
import EncryptionInput from './EncryptionInput'
import Steps from './Steps'

import Loader from '../../components/Loader'
import { NewSlugStore } from '../../store'
import { Card, Input, Button, IconLink, IconExternalLink, IconRefreshCw, IconCalendar, Menu} from '@supabase/ui'
import { SaveIcon } from '@heroicons/react/outline';

import { 
    CalendarIcon, 
    LinkIcon, 
    BanIcon, 
    ExternalLinkIcon, 
    TrashIcon, 
    BeakerIcon, 
    PauseIcon,
    DatabaseIcon, 
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
        { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" />, tab: <DestinationUrlInput /> },
        { id: 'brand / slug', title: 'Customization', icon: <CursorClickIcon className="h-6 w-6" />, tab: <DestinationSlugInput /> },
        { id: 'expiration', title: 'Expiration', icon: <CalendarIcon className="h-6 w-6"  />, tab: <CustomExpirationSelector /> },
    ]; 

    const analytics = [
        { id: 'seo', title: 'SEO Params', icon: <UserGroupIcon className='h-6 w-6' />},
        { id: 'utm', title: 'Campaign', icon: <SpeakerphoneIcon className='h-6 w-6' />},
        { id: 'abtests', title: 'A/B Tests', icon: <BeakerIcon className='h-6 w-6' />}
    ];
      
    const flags = [ 
        { id: 'blacklists', title: 'Blacklists', icon: <BanIcon className="h-6 w-6"  /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" /> },
        { id: 'ratelimits', title: 'Rate Limits', icon: <PauseIcon className="h-6 w-6"  /> },
        { id: 'redirects', title: 'Redirects', icon: <ExternalLinkIcon className='h-6 w-6' />},
        { id: 'cache', title: 'Cache', icon: <DatabaseIcon className='h-6 w-6' />}
    ]; 

    const actions = [
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
        <> 
            <p> {state.currentTab} </p>
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
                                        onClick={(e) => handleTabChange(e, value.id)}
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
        </>    
    );
}

var urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 

const UrlInput = () => {
    const [urlValue, setUrlValue] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(false)

    useEffect(() => {
        setIsValidUrl(urlValidator.test(urlValue));
    }, [isValidUrl, urlValue, urlValidator]);

    const handleUrlUpdate = (event) => {
        setUrlValue(event.target.value)
    }

    return (
        <Input 
            label="Destination URL"
            type="url"
            value={urlValue}
            onChange={handleUrlUpdate}
            error={urlValue.length >= 4 && urlValidationError ? 'Invalid URL' : null}
            icon={<IconLink />}
            descriptionText="Enter a valid destination URL" 
            labelOptional="HTTP/HTTPS protocol only"
            actions={[
                <Button 
                    size="small"
                    type="dashed" 
                    icon={<IconExternalLink />} 
                    disabled={!isValidUrl}
                    onClick={() => {
                        if(isValidUrl) {
                            router.push(`${urlValue}`)
                        }
                    }}
                />
            ]}
            className="mt-6"
        />
    );
}

const UrlSlug = async () => {
    // const [url, setUrl] = useState(`/api/slugs/refresh?category=${category}`);

    const [category, setCategory] = useState('')
    const [slug, setSlug] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [isError, setIsError] = useState('')
    const [isStale, setIsStale] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleRefresh = () => {
        setIsStale(true); 
    }

    useEffect(() => {
        const currentTimestamp = new Date().getTime();

        if((currentTimestamp - parseInt(createdAt)) > 60) {
            setIsStale(true);
        }
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            setIsStale(false); 

            await axios(`/api/slugs/refresh?category=${category}`)
            .then((resp) => {
                console.log(`Response******${JSON.stringify(resp)}`)
                setSlug('newslughere');
                setCreatedAt(new Date().getTime().toString());
            }).catch((err) => {
                console.log(`Error: ${err.message}`);
                setIsError(true)
            });
            setIsLoading(false);
        };
        fetchData(); 
    }, [category, isStale, slug]); 

    const { data, error } = useSWR('/api/slugs/new', fetcher)

    return (
        <div className="mt-1">
            {
                !data && !error 
            ?   <Loader />
            :   <Input
                    label="Custom Slug"
                    value={JSON.stringify(data.slug)}
                    type="text"
                    name="slug"
                    error={error ? 'ERRORRR' : null}
                    id="slug"
                    className="mt-6 shadow-sm focus:ring-yellow-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    descriptionText="Choose a category from ones available in the upper right hand corner" 
                    labelOptional="Required"
                    actions={[
                        <Button 
                            type="dashed" 
                            icon={<IconRefreshCw />} 
                            disabled={!isStale}
                            loading={isLoading}
                            onClick={handleRefresh}
                        >
                            OpenGraph
                        </Button>,
                    ]}
                />
            }
        </div>
    )
}

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <div className="w-full align-col justify-start align-stretch m-2 p-1">
            <Card>
                <Card.Meta title={title} description={description} /> 
                {children}
            </Card>
        </div>
    )
}

export const CustomExpirationSelector = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <InputElementCardWrapper
            title='Expiration [Time To Live]'
            description='When should this link go offline?'
            children={
               
                <Input 
                    name="ttl" 
                    id="ttl" 
                    value={state.ttl}
                    onChange={(event) => {
                        mutate('ttl', event.target.value)
                    }}
                    type="datetime-local"
                    className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="MM/DD/YYYY"
                    aria-describedby="expiry-optional"
                    icon={<IconCalendar className="h-5 w-5" />}
                />
            }
        />
    );
}


const DestinationSlugInput = ({ mutate }) => {

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                description={'Select or enter a slug of your liking'}
                children={<UrlSlug mutate={mutate} />}
            /> 
        </div>
    )
}

const DestinationUrlInput = ({ mutate }) => {
    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Destination URL"
                description="Where should visitors be directed?"
                children={<UrlInput mutate={mutate} />}
            />
        </div>
    )
}

const BlacklistInput = () => {
    return (
        <InputElementCardWrapper
            title="Destination URL"
            description="Where should visitors be directed?"
            children={<BlacklistInputContent />}
        />
    )
}

const NewSlug = ({ email }) => {
    const [session] = useSession()
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    
    const assignmentMutation = (key, value) => {
        dispatch({
            type: 'assign',
            payload: {
                key: key,
                value: value,
            }
        })
    }

    const mutateGlobalCache = ({ slug }) => {
        dispatch({
            type: 'publish_link',
            payload: {
                slug
            }
        });
    }

    const clearStaleInput = () => {
        dispatch({
            type: 'clear_inputs',
        })
    }

    const publish = async (slug, url, config) => {
        if(!session || loading) return;
        if(!slug || !slug.length || !url || !url.length) return;

        const res = await fetch('/api/slugs/save', {
            body: JSON.stringify({ 
                slug, 
                url, 
                config,
                userEmail: session.user.email
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        const { didSave, message, error } = await res.json()
        
        if(error) {
            toast.error(`Error! ${error}`)
        } else if(!didSave && message) {
            toast.error(`Unknown Error: ${message}`)
        } else {
            toast.success(`Success! ${message}`)
            mutateGlobalCache({ slug });
            clearStaleInput();
        }
    }   

    const handleSubmit = () => {
        if(error) {
            toast.error(`Error! ${error.message}`)
            return; 
        }

        let url =  `${state.destination}` || '';
        let slug = data ? `${data.slug}` : null
        let ttl = `${state.ttl}` || '';
        if(ttl) {
            ttl = new Date(ttl).getTime().toString();
        }
        let password = `${state.password}` || '';
        let blacklist = state.blacklist.length ? [...state.blacklist] : [];
        let seoTags = state.seoTags.length ? [...state.seoTags] : [];
        let routingStatus = state.routingStatus || '301';

        const config = { ttl, password, blacklist, seoTags, routingStatus }; 
        publish(slug, url, config)
    }

    const LinkIconSvg = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
        )
    }

 
    return (
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment-details-heading">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">
                
                {/* <span className="inline-flex justify-start align-start">
                    <LinkIconSvg className="h-6 w-6 text-green-300" /> 
                    <h2 className="text-lg leading-8 font-medium text-gray-700">
                        untitled
                    </h2>
                    <subtitle> 
                        {new Date().getTime()}
                    </subtitle>
                </span> */}
                <div>
                    <Steps />
                </div>
  
                <div className="mt-6 h-full w-full inline-flex justify-between align-stretch">
                  <div>
                    <SideMenu /> 
                  </div>
  
                  <div className="h-full w-full flex-col justify-start align-stretch m-5 p-2 bg-white text-black">
                    {state.currentTab === 'destination' && <DestinationUrlInput mutate={assignmentMutation} />}
                    {state.currentTab === 'slug' && <DestinationSlugInput mutate={assignmentMutation} />}
                    {state.currentTab === 'ttl' && <CustomExpirationSelector mutate={assignmentMutation} />}
                    {state.currentTab === 'password' && <EncryptionInput mutate={assignmentMutation} />}
                    {state.currentTab === 'blacklists' && <BlacklistInput />}
                    {state.currentTab === 'seo' && <TagManager />}
                  </div>
                </div>
            </div>
              
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    onClick={handleSubmit}
                    disabled={!session || loading}
                    type="submit"
                    className="bg-black border border-transparent rounded-sm shadow-md py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-200 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                    Save
                    <SaveIcon />
                </button>
            </div>
        </div>
    </section>
    </div>
    );
}
  
export default NewSlug  