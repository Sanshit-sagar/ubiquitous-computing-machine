import React, { useContext } from 'react'
import {
  Dropdown,
  Button,
  Divider,
  Typography,
  IconLogOut,
  IconChevronDown,
} from '@supabase/ui'

import { NewSlugStore } from '../../store'

import { UserCircleIcon, ExclamationCircleIcon, LoginIcon } from '@heroicons/react/solid'
import { useSession, signOut, signIn } from 'next-auth/client'
import Loader from '../Loader'
import { UserIcon } from '@heroicons/react/outline'

const DropdownMenu = () => {
  const [session, loading] = useSession()

  const dispatch = useContext(NewSlugStore.Dispatch)

  return (
    <Dropdown
      overlay={[
        <Dropdown.Misc 
          icon={
              loading ? <Loader />  
            : session && session.user ? <UserCircleIcon className="h-6 w-6" /> 
            : <ExclamationCircleIcon className="h-6 w-6" /> 
          }
          className="w-full inline-flex justify-between align-center"
          onClick={() => {
            if(!session || !session.user) {
              signIn();
            }}
          }
        >
          <Typography.Text>
            {   session && session?.user ? 
                <span className="text-sm"> 
                  {session.user.email} 
                </span>
              : loading ? <Loader /> 
              : <Typography.Text> 
                  Log in 
                </Typography.Text> 
            }
          </Typography.Text>
        </Dropdown.Misc>,
        <Divider light />,

        <Dropdown.Item onClick={() => {
            dispatch({
              type: 'openModal',
              payload: {
                title: 'Profile',
                description: 'View your profile',
                content:<p> yoyoyo </p>,
                status: 'info',
                tenant: 'dropdownMenu'
              }
            });  
          }
        }>
          <Typography.Text>
            Profile 
          </Typography.Text>
        </Dropdown.Item>,
        
        <> { session && session?.user && 
          <>
            <Divider light />
            <Dropdown.Item 
                icon={<IconLogOut />} 
                onClick={() => signOut()}
            >
              <Typography.Text>
                Log out
              </Typography.Text>
            </Dropdown.Item>
          </>
        } </>
      ]}
    >
      <Button 
        type="outline" 
        size="small" 
        iconRight={
              session && session.user 
            ? <IconChevronDown className="h-4 w-4 text-gray-700 font-extralight" /> 
            : <UserIcon className="h-4 w-4 text-gray-700 font-extralight" /> 
        }
        // onClick={() => {
        //   if(!loading && !session || !session?.user) {
        //     // show modal to signin or smth
        //   } 
        // }} 
        style={{ marginLeft: '5px' }}
      >
          <span className="text-sm text-gray-700 font-extralight">
            {loading ? <Loader /> : session && session?.user ? <p> {session.user.name} </p> : <p> Login </p> } 
          </span>
      </Button>
    </Dropdown>
  )
}


export default DropdownMenu