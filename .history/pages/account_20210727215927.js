import React, { useState, useContext } from 'react'
import { useSession } from 'next-auth/client'

import { InputGroup, FormGroup, Icon, Button } from '@blueprintjs/core'

import StackedLayout from '../sections/StackedLayout'
import { GlobalStore, NewSlugStore } from '../store'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

import { Card } from '../primitives/Card'
import CustomToolbar from '../primitives/Toolbar'
import VerticalTabs from '../primitives/VerticalTabs'

const MailIconSvg = () => {

  return (
    <svg 
      width="15" 
      height="15" 
      viewBox="0 0 15 15" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" 
        fill="currentColor" 
        fill-rule="evenodd" 
        clip-rule="evenodd">
      </path>
    </svg>
  );
}


export const InputElementCardWrapper = ({ title, description, children }) => {

  return (
      <div className="w-full align-col justify-start align-stretch m-2 mt-3 p-1">
          <Card interactive={true} ghost active={true}>
              <h5>
                  <span className="text-md font-extralight text-black">
                      {title}
                  </span>        
              </h5>
              <span className="text-sm font-extralight text-gray-700"> 
                  {description} 
              </span>
              
              <div className="mt-6">
                  <span className="text-sm font-extralight text-gray-700">
                      {children}
                  </span> 
              </div>
          </Card>
      </div>
    );
}

const AccountDetails = ({ handleAssign }) => {
  const [session, loading] = useSession()

  const items = [
    { 
        id: 'email', 
        title: 'Your E-mail', 
        description: 'This is your URL namespace within Vercel.',
        children: loading ? <Loader /> : 
          <FormGroup
              helperText="This is the email associated with your account"
              label="Your Email"
              labelFor="email"
              labelInfo="(immutable)"
              style={{ width: '900px'}}
          >
              <InputGroup 
                  id="email"
                  leftIcon={<Icon icon="envelope" intent="primary" />}
                  disabled={true}
                  value={session.user.email}
              />
          </FormGroup>
    },
    { 
        id: 'name', 
        title: 'Your Name', 
        description: 'Your full name, which also serves as your display name for this account',
        children: loading ? <Loader /> : 
          <FormGroup
              helperText="Your full name"
              label="Your Name"
              labelFor="name"
              labelInfo="(immutable)"
              style={{ width: '900px'}}
          >
              <InputGroup 
                  id="name"
                  leftIcon={<Icon icon="user" intent="primary" />}
                  disabled={true}
                  value={session.user.name}
              />
          </FormGroup>
    },
  ];

  return (
    <>
      {items.map(function(item, index) {
        return (
          <InputElementCardWrapper
            title={item.title}
            description={item.description}
            children={item.children}
          />
        );
      })}
    </>
  )
}

const ThemeOptions = ({ handleAssign }) => {

  return (
    <InputElementCardWrapper
      title="Theme Options"
      description="Select the site-wide theme you prefer"
      children={
        <FormGroup
            helperText="You can change the theme at any moment"
            label="Theme"
            labelFor="theme"
            style={{ width: '900px'}}
        >
          <Button> select your theme here </Button>
        </FormGroup>
      }
    />
  )
}

const DangerZone = ({ handleAssign }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleDeleteAccount = () => {
    setDeleteLoading(true)
    let toastId = toast.loading('Deleting...')
    
    // promise should go here 
    // alert('Deletion Confirmation')
    setTimeout(() => {
      console.log('deleting account...'); 
    }, 1500)
    
    setDeleteLoading(false); 
    toast.dismiss(toastId)
  }

  return (
    <InputElementCardWrapper
      title="Danger Zone"
      description="Here lie dragons"
      children={
        <FormGroup
            helperText="Deleting your account deletes all your data"
            label="Delete Account"
            labelFor="delete"
            style={{ width: '900px'}}
        >
          <Button 
            icon="trash" 
            intent="danger" 
            text="Delete Account" 
            loading={deleteLoading}
            onClick={handleDeleteAccount} 
          />
        </FormGroup>
      }
    />
  );
}

const VerticalTabsWrapper = ({ accountDetails, dangerZone, themeOptions }) => {
    
  let tabItems = [
      {id: 'details', title: 'Account Details', content: accountDetails },
      {id: 'theme', title: 'Theme', content: themeOptions },
      {id: 'danger', title: 'Danger Zone', content: dangerZone },
      {id: 'eventlog', title: 'Event Log', content: null },
      {id: 'tokens', title: 'Tokens', content: null },
      {id: 'invoices', title: 'Invoices', content: null },
  ];

  return (
      <VerticalTabs tabItems={tabItems} />
  );
}


const ProfileDetails = ({ email }) => {
  const uiState = useContext(GlobalStore.State)

  const state = useContext(NewSlugStore.State)
  const dispatch = useContext(NewSlugStore.Dispatch)

  const handleAssign = (key, value) => {
    dispatch({
        type: 'assign',
        payload: {
            key: key,
            value: value,
        }
    });
  }
  
  return (
    <Card style={{ height: '550px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}> 
        <CustomToolbar />
        <VerticalTabsWrapper 
          accountDetails={<AccountDetails mutate={handleAssign} />}
          themeOptions={<ThemeOptions mutate={handleAssign} />}
          dangerZone={<DangerZone mutate={handleAssign} />}
          eventlog={null}
          invoices={null}
          tokens={null}
        />
    </Card>
  );
}

const AccountPage = ({ meta }) => {
  const [session] = useSession()
  const email = session && session?.user ? session.user.email : ''

  return (
      <StackedLayout 
          pageMeta={meta} 
          children={
            <ProfileDetails email={email} />
          }
      />
  );
};

AccountPage.auth = true; 

AccountPage.defaultProps = {
    meta: {
        title: 'Create a new Slug',
        href: '/new' 
    }
};

export default AccountPage 