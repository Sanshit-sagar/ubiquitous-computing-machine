import useSWR from 'swr'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
const fetcher = (...args) => fetch(...args).then(res => res.json())

function PageViewsStats() {
  const router = useRouter();
  const { slug } = router.query

  if(!slug) return null;

  const [session, loading] = useSession()
  // const { data, error } = useSWR((slug && slug.length) ? `/api/hash/info/${slug}` : null, fetcher) 
  
  // if(!data && !error) return <p> loading... </p>
  // if(error) return <p> {error.message} -- {slug} </p>  
  
  return (
    <div style={{ width: '450px' }}>
      <h1> HIHIHI </h1> 
    </div> 
  )
}

export default PageViewsStats