import React, { useState, useContext } from 'react'
import { useSession } from 'next-auth/client'

import StackedLayout from '../sections/StackedLayout'
// import Profile from '../components/Profile'
import { GlobalStore } from '../store'
import { Card, Elevation, Menu, MenuItem, Button, Tab, Tabs } from '@blueprintjs/core'

const items = [
  { 
      id: 'email', 
      title: 'Your E-mail', 
      description: 'This is your URL namespace within Vercel.' 
  },
  { 
      id: 'name', 
      title: 'Your Name', 
      description: 'Please enter your full name, or a display name you are comfortable with.' 
  },
  { 
      id: 'avatar',
      title: 'Your Avatar', 
      description: 'This is your avatar'
  },
  { 
      id: 'delete', 
      title: 'Danger Zone', 
      description: 'Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not reversible, so please continue with caution' 
  },
];


const ProfileMenu = ({ email }) => {
  // const state = useContext(GlobalStore.State);
  const [selected, setSelected] = useState('name')

  const handleTabChange = (updatedTabId) => {
    setSelected(updatedTabId)
  }

  return (
    <Card style={{ backgroundColor: 'white'}}>
      <Tabs id="ProfileMenuTab" large={true}  vertical={true} animate={true} onChange={handleTabChange} selectedTabId={selected}>
        <Tab id="name" 
          title={<Button text="Your Name" rightIcon="user" alignText="left" 
          fill={true} large={true} minimal={true}/>} 
          panel={<Card> <h1> yoyoyo </h1></Card>} 
        />
        <Tab id="email"  title={<Button text="Your Email" rightIcon="inbox" alignText="left" fill={true} large={true} minimal={true}/>} panel={null} />
        {/* <Tab id="avatar" title="Avatar" icon="mugshot" panel={null} /> */}
        {/* <Tab id="theme" title="Theme" icon="style" panel={null} /> */}
        <Tabs.Expander />
        <Tab text="Delete" intent="danger" icon="warning-sign" /> 
      </Tabs>
    </Card>
  );
}

const ProfileDetails = ({ email }) => {
  const state = useContext(GlobalStore.State);

  return (
    <Card 
      className={state.darkMode ? 'bp3-darkMode' : ''} 
      style={{ width: '1275px', height: '100%', backgroundColor: state.darkMode ? 'rgba(54,64,82,1)' : 'rgba(255,255,255,1)', display: 'flex', flexDirection: 'row', justifyContent:'flex-start', alignItems: 'stretch' }}
    >  
         
        <ProfileMenu email={email} />

        <div style={{ marginLeft: '20px' }}>
          <h1> yoyo </h1>
        </div>
    </Card>
    
  );
}

const AccountPage = ({ meta }) => {
  const [session] = useSession()
  const email = session && session?.user ? session.user.email : ''
  // const email = 'sasagar@ucsd.edu'

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