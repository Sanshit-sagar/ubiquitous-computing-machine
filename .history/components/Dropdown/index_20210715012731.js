import React, { useContext } from 'react'
// import {
//   // Dropdown,
//   Button,
//   Divider,
//   Typography,
//   IconLogOut,
//   IconChevronDown,
// } from '@supabase/ui'
import Dropdown from '../../primitives/DropdownMenu'

import { NewSlugStore } from '../../store'

import { UserCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'
import { UserIcon } from '@heroicons/react/outline'

const DropdownMenu = () => {
  const [session, loading] = useSession()

  const dispatch = useContext(NewSlugStore.Dispatch)

  let item1 = { avatar: null, title: 'yeye' };
  let item2 = {avatar: null, title: 'naaa'};
  let item3 = { avatar: null, title: 'looool'}; 

  return (
    <Dropdown 
      label={session && session?.user ? `${session.user.name}` : <Loader />}
      item1={item1} 
      item2={item2} 
      item3={item3} 
    /> 
  )

  // return (
  //   <Dropdown
  //     overlay={[
  //       <Dropdown.Misc 
  //         key="profileInfo"
  //         icon={
  //             loading ? <Loader />  
  //           : session && session.user ? <UserCircleIcon className="h-6 w-6" /> 
  //           : <ExclamationCircleIcon className="h-6 w-6" /> 
  //         }
  //         className="w-full inline-flex justify-between align-center"
  //         onClick={() => {
  //           if(!session || !session.user) {
  //             signIn();
  //           }}
  //         }
  //       >
  //         <Typography.Text>
  //           {   session && session?.user ? 
  //               <span className="text-sm"> 
  //                 {session.user.email} 
  //               </span>
  //             : loading ? <Loader /> 
  //             : <Typography.Text> 
  //                 Log in 
  //               </Typography.Text> 
  //           }
  //         </Typography.Text>
  //       </Dropdown.Misc>,
  //       <Divider light />,

  //       <Dropdown.Item 
  //         key="action1"
  //         onClick={() => {
  //           dispatch({
  //             type: 'openModal',
  //             payload: {
  //               title: 'Profile',
  //               description: 'View your profile',
  //               content:<p> yoyoyo </p>,
  //               status: 'info',
  //               tenant: 'dropdownMenu'
  //             }
  //           });  
  //         }
  //       }>
  //         <Typography.Text>
  //           Profile 
  //         </Typography.Text>
  //       </Dropdown.Item>,
        
  //       <> { session && session?.user && 
  //         <>
  //           <Divider light />
  //           <Dropdown.Item 
  //               key="authButton"
  //               icon={<IconLogOut />} 
  //               onClick={() => signOut()}
  //           >
  //             <Typography.Text>
  //               Log out
  //             </Typography.Text>
  //           </Dropdown.Item>
  //         </>
  //       } </>
  //     ]}
  //   >
  //     <Button 
  //       type="outline" 
  //       size="small" 
  //       iconRight={
  //             session && session.user 
  //           ? <IconChevronDown className="h-4 w-4 text-gray-700 font-extralight" /> 
  //           : <UserIcon className="h-4 w-4 text-gray-700 font-extralight" /> 
  //       }
  //       style={{ marginLeft: '5px' }}
  //     >
  //         <span className="text-sm text-gray-700 font-extralight">
  //           {
  //               loading ? <Loader /> : session && session?.user 
  //             ? <span className="text-black dark:text-white text-sm font-extralight"> {session.user.name} </span> 
  //             : <span className="text-black dark:text-white text-sm font-extralight"> Login </span> 
  //           } 
  //         </span>
  //     </Button>
  //   </Dropdown>
  // )
}


export default DropdownMenu