import { useRouter } from 'next/router'
import {
  Dropdown,
  Button,
  Divider,
  Typography,
  IconLogOut,
  IconChevronDown,
} from '@supabase/ui'

import { UserCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useSession, signOut, signIn } from 'next-auth/client'

import Loader from '../Loader'

const DropdownMenu = ({ isModalOpen, setIsModalOpen, openModal, closeModal }) => {
  const router = useRouter()
  const [session, loading] = useSession()

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

        <Dropdown.Item onClick={() => {setIsModalOpen(!isModalOpen)}}>
          <Typography.Text>
            Dashboard 
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
        type="primary" 
        size="medium" 
        iconRight={<IconChevronDown />} 
        onClick={() => {
            if(!loading && !session.user) {
              signIn();
            } 
        }}
      >
          <span className="text-sm text-gray-700 font-extralight">
            Log in 
          </span>
      </Button>
    </Dropdown>
  )
}


export default DropdownMenu