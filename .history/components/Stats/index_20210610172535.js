import useSWR from 'swr'
import {useSession} from 'next-auth/client'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PageViewsStats() {
  if(!currentHash) return null; 
  const router = useRouter();
  const { slug } = router.query

  const [session, loading] = useSession()
  // const { data, error } = useSWR((slug && slug.length) ? `/api/hash/info/${slug}` : null, fetcher) 
  
  // if(!data && !error) return <p> loading... </p>
  // if(error) return <p> {error.message} -- {slug} </p>  
  
  return (
    <div style={{ width: '450px' }}>
      <dl className="mt-5 grid grid-cols-1 rounded-md bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        
        
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-xl font-semibold text-indigo-600">
            { slug && slug.length ? "***" + slug : 'N/A' }
          </div>

        </dd>
      </dl>
    </div> 
  )
}

export default PageViewsStats