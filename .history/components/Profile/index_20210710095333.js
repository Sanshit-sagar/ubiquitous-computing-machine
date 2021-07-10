import { useSession } from 'next-auth/client'

import { Card } from '@supabase/ui'

import Loader from '../Loader'

const ProfileDetails = () => {
  const [session, loading] = useSession()

  if(!session && !loading) {
    return (
      <button 
        disabled={loading}
        onClick={() => {
          router.push('/api/auth/signin')
        }}
        className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black hover:bg-green hover:text-white rounded-md shadow-md m-3 text-md font-bold"
      >
        { loading ? <Loader /> : <p> signin </p> }
      </button>
    )
  }

  return (
    <Card>
    <div className="mt-10 divide-y divide-gray-200">
      <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
       
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {
                    loading ? <Loader /> 
                  : session && session?.user 
                  ? <p> {session.user.name} </p> 
                  : <p> error </p> 
                }  
              </span>

             
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">Photo</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {loading ? <Loader /> : session ?
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                /> : null
                }
              </span>
              
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                { loading ? <Loader /> : session && session?.user ? <p> session.user.email </p> : null }
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">
              analytic.ly handle 
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                @todo
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {loading ? <Loader /> : session && session?.user ? <p> Update </p> : null}
                </button>
              </span>
            </dd>
          </div>

        </dl>
      </div>
    </div>
  </Card>
  );
}

export default ProfileDetails

// const ProfileDetails = ({ user }) => {
  

//   return (
//     <Card>
//       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
//         <Image
//           href={`${user.image}`}
//           alt={`${user.name}s profile picture`}
//           height={200}
//           width={200}
//         />

//         <Input 
//           label="Full Name"
//           value={user.name} 
//           type="text"
//           disabled
//         />

//         <Input 
//           label="E-mail Address"
//           value={user.email}
//           icon={<IconMail />} 
//           type="email"
//           disabled
//         />
//       </div>
//     </Card>
//   );
// }