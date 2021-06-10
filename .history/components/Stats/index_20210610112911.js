import useSWR from 'swr'
import {useSession} from 'next-auth/client'
import { withRouter } from 'next/router'
import SlugSelector from '../SlugSelector'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PageViewsStats({ router }) {
  const [session, loading] = useSession()
  const pathname = router.pathname 
  const slug = pathname

  const { data, error } = useSWR(session && !loading ? `/api/hash/info/${slug}` : null, fetcher)

  if(!data && !error) return <p> loading... </p>
  if(error) return <p> error </p>  
  
  return (
    <div style={{ width: '450px' }}>
      <dl className="mt-5 grid grid-cols-1 rounded-md bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <dt className="text-base font-normal text-gray-900">
          {`Hash: ${pathname}`}
        </dt>
        
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-xl font-semibold text-indigo-600">
            {JSON.stringify(data)}
          </div>
        </dd>
      </dl>
    </div>
  )
}

export default withRouter(PageViewsStats)