
import React, { useContext } from 'react';
import { useSession } from 'next-auth/client';

import toast from 'react-hot-toast';
import useSWR from 'swr'

import DestinationUrl from './DestinationUrl'
import PersonalizedSlug from './PersonalizedSlug';
import IpBlacklist from './IpBlacklist'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
import EncryptionInput from './EncryptionInput'
import CampaignTracker from './CampaignTracker'
import Steps from './Steps'

import Loader from '../../components/Loader'
import { NewSlugStore } from '../../store'
import { SaveIcon } from '@heroicons/react/outline';
import VerticalTabs from '../../primitives/VerticalTabs'


import { Card, IconCalendar } from '@supabase/ui'

function NewSlugMenu() {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleTabChange = (tabId) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'currentTab',
                value: tabId
            }
        }); 
    }

    // const details = [
    //     { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" /> },
    //     { id: 'slug', title: 'Customization', icon: <CursorClickIcon className="h-6 w-6" /> },
    //     { id: 'ttl', title: 'Expiration', icon: <CalendarIcon className="h-6 w-6"  />},
    // ]; 

    // const analytics = [
    //     { id: 'seo', title: 'UTM Tags', icon: <UserGroupIcon className='h-6 w-6' /> },
    //     // { id: 'abtests', title: 'A/B Tests', icon: <BeakerIcon className='h-6 w-6' /> }
    // ];
      
    // const flags = [ 
    //     { id: 'blacklists', title: 'Blacklists', icon: <BanIcon className="h-6 w-6"  /> },
    //     { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" /> },
    //     // { id: 'ratelimits', title: 'Rate Limits', icon: <PauseIcon className="h-6 w-6"  /> },
    //     // { id: 'redirects', title: 'Redirects', icon: <ExternalLinkIcon className='h-6 w-6' /> },
    //     // { id: 'cache', title: 'Cache', icon: <DatabaseIcon className='h-6 w-6' /> }
    // ]; 

    // const actions = [
    //     // { id: 'duplicate', title: 'Duplicate', icon: <DocumentDuplicateIcon className='h-6 w-6' /> },
    //     { id: 'share', title: 'Share', icon: <GlobeAltIcon className='h-6 w-6' /> },
    //     // { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' /> }
    // ];

    // const items = [
    //     { index: 0, content: [...details], title: 'Details'},
    //     { index: 1, content: [...analytics], title: 'Analytics'},
    //     { index: 2, content: [...flags], title: 'Feature Flags'},
    //     { index: 3, content: [...actions], title: 'Actions'}
    // ]; 

    return (
        <VerticalTabs 
            urlInput={<DestinationUrl />}
            slugInput={<PersonalizedSlug />}
            ttlInput={<ExpirationDateTime />}
            blacklistInput={<IpBlacklist />}
            encryptionInput={<EncryptionInput />}
            campaignTracker={<CampaignTracker />}
        />
    );
}

export const InputElementCardWrapper = ({ title, description, children }) => {

    return (
        <div className="w-full align-col justify-start align-stretch m-2 p-1">
            <Card>
                <Card.Meta title={title} description={description} />
                <div className="mt-6">
                    {children}
                </div> 
            </Card>
        </div>
    )
}

// const DestinationUrl = ({ mutate }) => {
//     var urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
//     const state = useContext(NewSlugStore.State)

//     const [urlValue, setUrlValue] = useState('')
//     const [isValidUrl, setIsValidUrl] = useState(false)

//     useEffect(() => {
//         setIsValidUrl(urlValidator.test(urlValue));
//     }, [urlValue, urlValidator]);

//     const handleUrlUpdate = (event) => {
//         setUrlValue(event.target.value)
//     }

//     return (
//         <div className="w-full flex-col justify-start align-stretch">
//             <InputElementCardWrapper
//                 title="Custom Slug"
//                 description={'Select or enter a slug of your liking'}
//                 children={
//                     <Input 
//                         label="Destination URL"
//                         type="url"
//                         value={state.destination}
//                         onChange={(event) => {
//                             handleUrlUpdate(event);
//                             mutate('destination', event.target.value)
//                         }}
//                         error={!isValidUrl ? "invalid url" : ""}
//                         icon={
//                             <IconLink className="h-6 w-6 text-black" />
//                         }
//                         descriptionText="Enter a valid destination URL" 
//                         labelOptional="HTTP/HTTPS only"
//                         className="mt-6"
//                     />
//                 }
//             />
//         </div>
//     );
// }

// const PersonalizedSlug = () => {
//     const { data, error } = useSWR('/api/slugs/new')

//     if(!data && !error) return <Loader />
//     if(error) return <p> Error: {error.message} </p>

//     return (
//         <div className="w-full flex-col justify-start align-stretch">
//             <InputElementCardWrapper
//                 title="Custom Slug"
//                 description={'Select or enter a slug of your liking'}
//                 children={
//                     <div className="mt-1">
//                         <Input
//                             value={data.slug}
//                             type="text"
//                             label="Slug"
//                             descriptionText="Select the Slug you'd like your viewers to click" 
//                         />
//                     </div>
//                 }
//             />
//         </div>
//     )
// }


export const ExpirationDateTime = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title='Expiration [Time To Live]'
                description='When should this link go offline?'
                children={
                
                    <input 
                        name="ttl" 
                        id="ttl" 
                        value={state.ttl}
                        onChange={(event) => {
                            mutate('ttl', event.target.value)
                        }}
                        type='datetime-local'
                        className="mt-2 mb-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:text-white dark:bg-gray-700"
                        placeholder="MM/DD/YYYY"
                        aria-describedby="expiry-optional"
                        icon={<IconCalendar className="h-5 w-5" />}
                    />
                }
            />
        </div>
    );
}

const NewSlug = () => {
    const [session, loading] = useSession()

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { data, error } = useSWR('/api/slugs/new')
    
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
        alert(`publishing... slug: ${slug} and URL: ${url}`)

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
        alert(`Submitting ${JSON.stringify(config)} for slug:${slug} with destination ${url}`);

        publish(slug, url, config)
    }
 
    return (
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <div className="py-6 px-4 w-full h-full flex-col justify-items-start align-stretch">
                <div>
                    <Steps />
                </div>
                <div>
                    <NewSlugMenu /> 
                </div>
            </div>
                
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    onClick={handleSubmit}
                    disabled={!session && !loading}
                    type="submit"
                    className="bg-black border border-transparent rounded-sm shadow-md py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-200 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                    Save
                    <SaveIcon />
                </button>
            </div>
        </div>
    );
}
  
export default NewSlug  