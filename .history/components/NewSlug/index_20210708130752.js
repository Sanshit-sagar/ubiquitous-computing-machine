
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

import Loader from '../../components/Loader'
import { NewSlugStore } from '../../store'
import { Card, IconSave, Input, Button, IconLink, IconActivity, IconExternalLink, IconRefreshCw, IconCalendar } from '@supabase/ui'


const fetcher = url => axios.get(url).then(res => res.data)

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
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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

const CustomExpirationSelector = ({ mutate }) => {
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


function ActionButtons() {
    const [session, loading] = useSession()

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { data, error } = useSWR('/api/slugs/new')

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

   
    return (
        <Button
            block
            type="primary"
            size="medium"
            iconRight={<IconSave />}
            onClick={handleSubmit}
            disabled={!session || loading}
        >
            Save
        </Button>
    );
}


const NewSlug = () => {
 
    return (
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment-details-heading">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                    Create New Slug
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your billing information. Please note that updating your location could affect your tax
                    rates.
                  </p>
                </div>
  
                <div className="mt-6 inline-flex justify-between align-stretch">
                  <div>
                    <SideMenu /> 
                  </div>
  
                  <div>
  
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-200 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
  }
  

const NewSlug = ({ email }) => {
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

    return (
        <Card>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <> 
                    <SideMenu /> 
                </>
            
                <>
                    {state.currentTab === 'destination' && <DestinationUrlInput mutate={assignmentMutation} />}
                    {state.currentTab === 'slug' && <DestinationSlugInput mutate={assignmentMutation} />}
                    {state.currentTab === 'ttl' && <CustomExpirationSelector mutate={assignmentMutation} />}
                    {state.currentTab === 'password' && <EncryptionInput mutate={assignmentMutation} />}
                    {state.currentTab === 'blacklists' && <BlacklistInput />}
                    {state.currentTab === 'seo' && <TagManager />}
                </> 
            </div>

            <ActionButtons />
        </Card>
    )
}

export default NewSlug  