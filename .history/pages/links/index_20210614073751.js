import { Layout } from '@/sections/index';
import LinksTable from '@/components/LinksTable'
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const useListOfSlugs = () => { 
    // pass uid above
    const { data, error } = useSWR('/api/slugs/list', fetcher);

    return {
        data: data.slugs,
        loading: !data && !error,
        error
    };
}


const TabulatedLinks = ({ links }) => {

    return (
        <div style={{ border: 'thin solid black' }}>
            <h1> My Links </h1>
            <subtitle> Count: {links.length} </subtitle>
            <br /> 
            
            <>
                {links.map(function(value, index, array) {
                    return (
                        <div key={index}>
                            <p> {index}: {JSON.stringify(value)} </p>
                        </div>
                    )
                })}
            </>
        </div>
    );
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
                :   <TabulatedLinks links={data} />
            }

        </Layout>
    );
};


export default Links;