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
            : session && session.user ? <UserCircleIcon className="h-6 w-6" /> 
            : <ExclamationCircleIcon className="h-6 w-6" /> 
          }
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'yellow' }}
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
              Dashboard 
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
          <Button
            size="small"
            variant="danger"
            onClick={() => {router.push('/api/auth/signout')}}
          > 
            Logout
          </Button> 
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