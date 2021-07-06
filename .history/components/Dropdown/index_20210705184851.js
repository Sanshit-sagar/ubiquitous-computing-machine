import {
  Dropdown,
  Button,
  Divider,
  Typography,
  IconLogOut,
  IconChevronDown,
} from '@supabase/ui'

import { UserCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

import Loader from '../Loader'
import { useSession } from 'next-auth/client'

const DropdownMenu = () => {
  const [session, loading] = useSession()

  return (
    <Dropdown
      overlay={[
        <Dropdown.Misc 
          icon={
              loading ? <Loader />  
            : session && session.user ? <UserCircleIcon /> 
            : <ExclamationCircleIcon className="h-6 w-6" /> 
          }
        >
          <Typography.Text>
            { 
                session && session?.user ? 
                  <span className="text-sm"> 
                    {session.user.email}
                  </span>

              : loading ? '...'
              : 'Log in' 
            }
          </Typography.Text>
        </Dropdown.Misc>,
        <Divider light />,
        <Dropdown.Item>
          <Typography.Text>
            <a href='/dashboard'> 
              My Dashboard 
            </a>
          </Typography.Text>
        </Dropdown.Item>,
        <Dropdown.Item>
          <Typography.Text>
            <a href='/profile'> 
              Preferences 
            </a>
          </Typography.Text>
        </Dropdown.Item>,

        <Divider light />,
        <Dropdown.Item icon={<IconLogOut />}>
          <Typography.Text>Log out</Typography.Text>
        </Dropdown.Item>,
      ]}
    >
      <Button type="outline" iconRight={<IconChevronDown />}>
        { 
           session && session.user 
         ? session.user.name : loading  
         ? <Loader /> 
         : <span className="text-sm text-gray-700 font-extralight"> unauthenticated </span>
        }
      </Button>
    </Dropdown>
  )
}


export default DropdownMenu