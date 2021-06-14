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

const UserStatistics = ({ links }) => {
    const numLinks = Object.entries(links).length

    const stats = [
        { name: 'Num Links', stat: numLinks },
        { name: 'Num Views', stat: '50' },
      ]

    return (
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
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
                { JSON.stringify(fields)}
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
    return (
        <div style={{ border: 'thin solid black' }}>
            <h1> My Links </h1>
            <subtitle> 
                Count: {Object.entries(links).length} 
            </subtitle>
            <br /> 
            
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
         </div>
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
    
    return (
        <Layout>
            <section className="text-center pt-12 sm:pt-24 pb-16">
                <h2 className="text-4xl sm:text-7xl font-bold capitalize">
                    My Links
                </h2>
            </section>

            <UserStatistics links={links} /> 

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