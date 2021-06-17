import React, { useContext } from 'react'
import {useSession, getSession} from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
import InputForm from '../components/MarkdownEditor/InputForm'
import CustomSpinner from '../buildingBlocks/Spinner'
import {GlobalStore} from '../store'

// const PageHeadingText = () => {
//   const [session, loading] = useSession()
//   const state = useContext(GlobalStore.State)

//   return (
//     <div className="flex-col items-between justify-stretch px-2 py-1"> 
//         <h2 className="text-2xl font-bold leading-3 text-white sm:text-3xl sm:truncate">
//           { !state.router.current ? loading ? <CustomSpinner /> : session.user.email : state.router.current }
//         </h2>
//     </div>
//   )
// }

export default function NewLinkPage() {
  const [session, loading] = useSession()

  return (
    <div className="container w-full">
      <StackedLayout 
        pageMeta={{ 
          title: 'Create a new Slug',
          href: '/new' 
        }} 
        children={<InputForm />}
      />
    </div>
  );
};

export async function getServerSideProps (context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}