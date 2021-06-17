import {useRouter} from 'next/router'

function PageViewsStats() {
  const router = useRouter();
  const { slug } = router.query

  if(!slug) return null; 
  
  return (
    <div style={{ width: '450px' }}>
      <h1> HIHIHI </h1> 
    </div> 
  )
}

export default PageViewsStats