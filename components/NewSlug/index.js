
import React, { Fragment, useState, useContext } from 'react';
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
import { Card, IconSave, Input, Button } from '@supabase/ui'


// import DisclosurePanels from '../../buildingBlocks/Disclosure'
// import MyRadioGroup from '../../buildingBlocks/ActiveLink'
// import MyModal from '../../buildingBlocks/MyModal'

const fetcher = url => axios.get(url).then(res => res.data)

const UrlSlug = () => {
    const { data, error } = useSWR('/api/slugs/new', fetcher)

    return (
        <div className="mt-1">
            {
                    !data && !error ? <Loader />
                :   error ? <p> error... </p> 
                :   <Input
                        value={data.slug}
                        type="text"
                        name="slug"
                        id="slug"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
            }
        </div>
    )
}

const UrlInput = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
    let [isModalOpen, setIsModalOpen] = useState(true)

    function closeModal() {
        setIsModalOpen(false)
    }
  
    function openModal() {
        setIsModalOpen(true)
    }

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Payment successful
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Your payment has been successfully submitted. We’ve sent
                                    your an email with all of the details of your order.
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeModal}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <div className="w-full align-col justify-start align-stretch m-2 p-1">
            <Card>
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
                    {state.currentTab === 'password' && <EncryptionInput />}
                    {state.currentTab === 'blacklists' && <BlacklistInput />}
                    {/* {state.currentTab === 'redirects' && <DisclosurePanels mutate={assignmentMutation} /> } */}
                    {/* rate limiter, A/B testing */}
                    {state.currentTab === 'seo' && <TagManager />}
                </> 
            </div>

            <ActionButtons />
        </Card>
    )
}

export default NewSlug  