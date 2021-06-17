import useSWR from 'swr'
import fetcher from '../../lib/utils'
import CustomSpinner from '../../buildingBlocks/Spinner'
import { useSession } from 'next-auth/client'
import { CursorClickIcon, EyeIcon  } from '@heroicons/react/solid'

const useUserCollectionSize = (uid) => {
    const {data, error} = useSWR(uid.length ? `/api/slugs/user-links/${uid}` : null, fetcher)

    return {
        numLinks: data ? data.userLinks : null,
        loading: !data && !error,
        error   
    };
}

const useUserClickStreamSize = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        numViews: data ? data.userViews : null,
        loading: !data && !error,
        error
    }
}

function StatisticsCards({ uid }) {
    const { numViews, nvLoading, nvError } = useUserClickStreamSize(uid)
    const { numLinks, nlLoading, nlError } = useUserCollectionSize(uid)
    
    const stats = {
        numClicks: { 
            name: 'Views', 
            value: numViews ? `${numViews}` : nvLoading ? <CustomSpinner /> : '0',
            icon: <CursorClickIcon className="w-6 h-6 text-white" />,
        },
        numLinks: { 
            name: 'Links', 
            value: numLinks ? `${numLinks}` : nlLoading ? <CustomSpinner /> : '0',
            icon: <EyeIcon className="w-6 h-6 text-white" />,
        },
    };

    return (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            {Object.entries(stats).map(function(val, index, array) {
                return (
                    <div key={index}>
                        <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                {array[index][1].icon}    
                            </div>

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

    return (
        <>
            <StatisticsCards uid={uid} />
        </>
    ); 
}


export default StatisticsCardsWrapper