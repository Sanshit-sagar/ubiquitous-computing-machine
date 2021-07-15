import React, { useContext } from 'react'
import Dropdown from '../../primitives/DropdownMenu'
import { Button } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'

import { UserCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'
import { UserIcon } from '@heroicons/react/outline'

const ProfileButton = () => {
  const [session, loading] = useSession()

  return (
    <Button 
        icon="user" 
        minimal={true}
        text={ 
            loading ? <Loader /> 
          : session && session?.user 
          ? <span className="text-sm"> {session.user.email} </span>
          : <Typography.Text> Log in </Typography.Text> 
      }
    />
  )
}

const LogoutButton = () => {
  return (
    <Button 
        type="outline" 
        size="small" 
        iconRight={
              session && session.user 
            ? <IconChevronDown className="h-4 w-4 text-gray-700 font-extralight" /> 
            : <UserIcon className="h-4 w-4 text-gray-700 font-extralight" /> 
        }
        style={{ marginLeft: '5px' }}
      >
          <span className="text-sm text-gray-700 font-extralight">
            {
                loading ? <Loader /> : session && session?.user 
              ? <span className="text-black dark:text-white text-sm font-extralight"> {session.user.name} </span> 
              : <span className="text-black dark:text-white text-sm font-extralight"> Login </span> 
            } 
          </span>
      </Button>
  )
}

const DropdownMenu = () => {
  const [session, loading] = useSession()

  const dispatch = useContext(NewSlugStore.Dispatch)

  let label = session && session?.user ? `${session.user.name}` : <Loader />;
  let item1 = { avatar: null, title: <ProfileButton /> };
  let item2 = { avatar: null, title: 'naaa'};
  let item3 = { avatar: null, title: <LogoutButton /> }; 

  return (
    <Dropdown 
      label={label}
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