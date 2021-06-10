import {useRouter} from 'next/router'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PageViewsStats() {
  const router = useRouter()
  const pathname = router.pathname

  const { data, error } = useSWR(session && !loading ? `/api/hash/info?path=${pathname}` : null, fetcher)

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
            {data.views}
          </div>
        </dd>
      </dl>
    </div>
  )
}

export default PageViewsStats