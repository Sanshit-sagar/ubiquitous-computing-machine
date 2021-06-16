import { Layout } from '@/sections/index';
// import LinksTable from '@/components/LinksTable'
import useSWR from 'swr'
import fetcher from '../../lib/utils'
import {useSession} from 'next-auth/client'

const useListOfSlugs = () => { 
    // pass uid above
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : ''
    const { data, error } = useSWR(email.length ? `/api/slugs/list` : null, fetcher);

    return {
        links: data ? data.slugs : null,
        loading: !data && !error,
        error
    };
}

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

const UserStatistics = ({ uid }) => {
    // const numLinks = links ? Object.entries(links).length : 0
    const {numViews, nvLoading, nvError} = useUserClickStreamSize(uid)
    const {numLinks, nlLoading, nlError} = useUserCollectionSize(uid) 
    

    const stats = [
        { name: 'Num Links', stat: numLinks ? numLinks : nvLoading ? '...' : 'error'},
        { name: 'Num Views', stat: numViews ? numViews : nlLoading ? '...' : 'error'},
      ]

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
  }

const LinkEntry = ({ link }) => {
    const slug = link[0]
    const fields = JSON.parse(link[1])

    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)

    return (
        <div style={{ border: 'thin solid black', margin: '5px', padding: '2.5px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p> 
                <strong> {link[0]} </strong> 
            </p>
            
            <div style={{ border: 'thick solid red'}}>
                { JSON.stringify(fields) }
            </div>
            
            <div style={{ backgroundColor: 'pink' }}>
                { 
                    !data && !error ? <p> ... </p> 
                    : error ? <p> !!!! </p> 
                    : <p> Views: {data.views} </p> 
                }
            </div>
        </div>
    )
}

const TabulatedLinks = ({ links }) => {
    const [session, loading] = useSession()

    return (
        <div style={{ border: 'thin solid black' }}>
           
           <div>
                {Object.entries(links).map(function(value, index, array) {
                    return (
                        <div key={index}>
                            {session && !loading && JSON.parse(value[1]).user===session.user.email ?
                                <>
                                    <p> {index}: </p>
                                    <LinkEntry link={value} />
                                </>
                            : null}
                         </div>
                    );
                })}
            </div>
         </div>
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
    const [session, userLoading] = useSession()

    const uid = session && !userLoading ? session.user.email : ''

    return (
        <Layout>
            <section className="text-center pt-12 sm:pt-24 pb-16">
                <h2 className="text-4xl sm:text-7xl font-bold capitalize">
                    My Links
                </h2>
            </section>

            <UserStatistics uid={uid} /> 

            {/* <LinksTable />  */}

            { 
                    loading ? <p> loading... </p> 
                :   error   ? <p> error...   </p>
                :   <TabulatedLinks links={links} />
            }

        </Layout>
    );
};


export default Links;