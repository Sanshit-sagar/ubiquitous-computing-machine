import { Layout } from '@/sections/index';
import LinksTable from '@/components/LinksTable'
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const useListOfSlugs = () => { 
    // pass uid above
    const { data, error } = useSWR('/api/slugs/list', fetcher);

    return {
        data,
        loading: !data && !error,
        error
    };
}

const Links = () => {
    const { data, loading, error } = useListOfSlugs()
        
    return (
        <Layout>
            <section className="text-center pt-12 sm:pt-24 pb-16">
                <h1 className="text-4xl sm:text-7xl font-bold capitalize">
                My Links
                </h1>
            </section>

            {/* <LinksTable />  */}

            { 
                    loading ? <p> loading... </p> 
                :   error   ? <p> error...   </p>
                :   JSON.stringify(data) 
            }

        </Layout>
    );
};


export default Links;