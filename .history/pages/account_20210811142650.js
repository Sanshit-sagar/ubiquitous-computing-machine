import React from 'react'
import { useSession } from 'next-auth/client'

import { InputGroup, FormGroup, Icon, Button } from '@blueprintjs/core'

import Layout from '../sections/Layout'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

import { Card } from '../primitives/Card'
import CustomToolbar from '../primitives/Toolbar'
import VerticalTabs from '../primitives/VerticalTabs'
import InputElementCardWrapper from '../components/NewSlug'

// export const InputElementCardWrapper = ({ title, description, children }) => {

//   return (
//       <div className="w-full align-col justify-start align-stretch m-2 mt-3 p-1">
//           <Card interactive={true} ghost active={true}>
//               <h5>
//                   <span className="text-md font-extralight text-black">
//                       {title}
//                   </span>        
//               </h5>
//               <span className="text-sm font-extralight text-gray-700"> 
//                   {description} 
//               </span>
              
//               <div className="mt-6">
//                   <span className="text-sm font-extralight text-gray-700">
//                       {children}
//                   </span> 
//               </div>
//           </Card>
//       </div>
//     );
// }

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

const ThemeOptions = () => {

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
  );
}

const DangerZone = () => {
 

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
}

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
};

AccountPage.defaultProps = {
    metadata: {
        title: 'Create a new Slug',
        href: '/new' 
    }
};

export default AccountPage 