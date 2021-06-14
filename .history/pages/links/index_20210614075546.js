import { Layout } from '@/sections/index';
import LinksTable from '@/components/LinksTable'
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const useListOfSlugs = () => { 
    // pass uid above
    const { data, error } = useSWR('/api/slugs/list', fetcher);

    return {
        links: data ? data.slugs : null,
        loading: !data && !error,
        error
    };
}

const LinkEntry = ({ link }) => {

    const fields = JSON.parse(link[1])

    return (
        <div style={{ border: 'thin solid black', margin: '5px', padding: '2.5px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p> 
                <strong> {link[0]} </strong> 
            </p>
            
            <div style={{ border: 'thick solid red'}}>
                {fields.map(function(value, i) {
                    return (
                        <div key={i}>
                            <p> {value[1]} </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const TabulatedLinks = ({ links }) => {
    return (
        <div style={{ border: 'thin solid black' }}>
            <h1> My Links </h1>
            <subtitle> Count: {Object.entries(links).length} </subtitle>
            <br /> 
            
            {/* { links && links.length ?  */}
           
           <div style={{ backgroundColor: '#0606'}}>
                {Object.entries(links).map(function(value, index, array) {
                    return (
                        <div key={index}>
                            <p> {index}: </p>
                            <LinkEntry link={value} /> 
                        </div>
                    );
                })}
            </div>

                {/* : null } */}
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