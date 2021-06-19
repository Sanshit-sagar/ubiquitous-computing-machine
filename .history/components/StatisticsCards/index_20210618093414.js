import useSWR from 'swr'
import {fetcher} from '../../lib/utils'
import CustomSpinner from '../../buildingBlocks/Spinner'
import { useSession } from 'next-auth/client'
import { CursorClickIcon, EyeIcon  } from '@heroicons/react/solid'

const useUserCollectionSize = (uid) => {
    const {data, error} = useSWR(uid.length ? `/api/slugs/user-links/${uid}` : null, fetcher)

    return {
        numLinks: data ? data.userLinks : null,
        nlLoading: !data && !error,
        nlError: error   
    };
}

const useUserClickStreamSize = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        numViews: data ? data.userViews : null,
        nvLoading: !data && !error,
        nvError: error
    }
}

function StatisticsCards({ uid }) {
    const { numViews, nvLoading, nvError } = useUserClickStreamSize(uid)
    const { numLinks, nlLoading, nlError } = useUserCollectionSize(uid)
    
    const stats = {
        numClicks: { 
            name: 'Views', 
            value: numViews ? `${numViews}` : !nvError ? <CustomSpinner /> : '0',
            icon: <CursorClickIcon className="w-6 h-6 text-indigo-700" />,
        },
        numLinks: { 
            name: 'Links', 
            value: numLinks ? `${numLinks}` : !nlError ? <CustomSpinner /> : '0',
            icon: <EyeIcon className="w-6 h-6 text-indigo-700" />,
        },
    };

    return (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            {Object.entries(stats).map(function(val, index, array) {
                return (
                    <div key={index}>
                        <div class="bg-white hover:bg-black border-black hover:border-white text-black hover:text-white shadow-lg rounded-md flex items-stretch justify-between p-1 border-b-1 font-lightest group">
                            <span class="flex justify-start items-stretch w-20 h-20">
                                {array[index][1].icon}    
                            </span>

                            <div class="text-right">
                                <p class="text-2xl">
                                    {array[index][1].value}
                                </p>
                                <p>
                                    {array[index][1].name}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );  
}

function StatisticsCardsWrapper() {
    const [session, loading] = useSession()

    if(loading) return <p> loading... </p> //TODO: SKELETON
    if(!session && !loading) return <p> error... </p> //LOG AND REDIRECT

    const uid = session && session.user ? session.user.email : '';

    return <StatisticsCards uid={uid} />;
}


export default StatisticsCardsWrapper