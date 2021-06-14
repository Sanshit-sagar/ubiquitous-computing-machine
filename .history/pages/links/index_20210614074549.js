import { Layout } from '@/sections/index';
import LinksTable from '@/components/LinksTable'
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const useListOfSlugs = () => { 
    // pass uid above
    const { data, error } = useSWR('/api/slugs/list', fetcher);

    return {
        links: data.slugs,
        loading: !data && !error,
        error
    };
}


const TabulatedLinks = ({ links }) => {
    return (
        <div style={{ border: 'thin solid black' }}>
            <h1> My Links </h1>
            <subtitle> Count: {Object.entries(links).length} </subtitle>
            <br /> 
            
            { links && links.length ? 
           
           <div style={{ backgroundColor: '#0606'}}>
                {Object.entries(links).map(function(value, index, array) {
                     <div key={index}>
                        return <p> {index}: {JSON.stringify(value)} </p>
                    </div>
                })}
            </div>

                : null }
         </div>
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
        
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
                :   <TabulatedLinks links={links} />
            }

        </Layout>
    );
};


export default Links;