import React from 'react'
import { useSession } from 'next-auth/client'

import { InputGroup, FormGroup, Icon, Button } from '@blueprintjs/core'

import { AccessibleIcon } from '../primitives'
import { Button } from '../primitives/Button'
import { Text } from '../primitives/Text'

import Layout from '../sections/Layout'
import Loader from '../components/Loader'

import { Card } from '../primitives/Card'
import CustomToolbar from '../primitives/Toolbar'
import VerticalTabs from '../primitives/VerticalTabs'
import InputElementCardWrapper from '../components/NewSlug'


const AccountDetails = () => {
  const [session, loading] = useSession()

  const items = [
    { 
        id: 'email', 
        title: 'Your E-mail', 
        description: 'This is your URL namespace within Vercel.',
        children: loading ? <Loader /> : 
          <Label
              helperText="This is the email associated with your account"
              label="Your Email"
          >
              <TextField 
                  id="email"
                  leftIcon={<Icon icon="envelope" intent="primary" />}
                  disabled={true}
                  value={session.user.email}
              />
           </Label>
         
    },
    { 
        id: 'name', 
        title: 'Your Name', 
        description: 'Your full name, which also serves as your display name for this account',
        children: loading ? <Loader /> : 
          <Label
              helperText="Your full name"
              label="Your Name"
          >
              <TextField 
                  id="name"
                  disabled={true}
                  value={session.user.name}
              />
          </Label>
    },
  ];

  return (
    
    <div key={index}>
      {items.map(function(item, index) {
        return (
          <div key={index}>
            <InputElementCardWrapper
              title={item.title}
              description={item.description}
              children={item.children}
            />  
          </div>
        );
      })}
    </div>
  )
}

const ThemeOptions = () => {

  return (
    <InputElementCardWrapper
      title="Theme Options"
      description="Select the site-wide theme you prefer"
      children={
        <Label
            helperText="You can change the theme at any moment"
            label="Theme"
        >
          <Button> select your theme here </Button>
        </Label>
      }
    />
  );
}

const DangerZone = () => {
 

  return (
    <InputElementCardWrapper
      title="Danger Zone"
      description="Here lie dragons"
      children={
        <Label
            helperText="Deleting your account deletes all your data"
            label="Delete Account"
        >
          <Button 
            icon="trash" 
            intent="danger" 
            text="Delete Account" 
            loading={deleteLoading}
            onClick={handleDeleteAccount} 
          />
        </Label>
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
      {id: 'invoices', title: 'Invoices', content: null }
  ];

  return (
      <VerticalTabs tabItems={tabItems} />
  );
}


const ProfileDetails = () => {

  return (
    <Card style={{ height: '550px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}> 
      <CustomToolbar />
      <VerticalTabsWrapper 
        accountDetails={<AccountDetails/>}
        themeOptions={<ThemeOptions />}
        dangerZone={<DangerZone />}
        eventlog={null}
      />
    </Card>
  );


const AccountPage = ({ metadata }) => {

  const [session, loading] = useSession()
  const email = !loading && session?.user ? session.user.email : ''

  return (
      <Layout 
          metadata={metadata} 
          children={
            <ProfileDetails email={email} />
          }
      />
  );
}

AccountPage.defaultProps = {
    metadata = {
        title: 'Create a new Slug',
        href: '/new' 
    }
};

export default AccountPage 