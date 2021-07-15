import React, { useContext } from 'react'
import Dropdown from '../../primitives/DropdownMenu'
import { Button } from '@blueprintjs/core'
import { NewSlugStore } from '../../store'

import { useSession, signOut, signIn } from 'next-auth/client'
import ProfileAvatar from '../../primitives/Avatar'

const ProfileButton = () => {
  const [session, loading] = useSession()

  return (
    <Button 
        icon="user" 
        fill={true}
        minimal={true}
        alignText="right"
        loading={loading}
        text={ 
            !loading && session && session?.user 
          ? <span className="text-sm"> {session.user.name.split(' ')[0]} </span>
          : <span className="text-sm"> Log in </span>
      }
    />
  )
}

const AuthButton = () => {
  const [session, loading] = useSession()

  return (
    <Button 
        fill={true}
        minimal={true}
        loading={loading}
        alignText="right"
        size="small" 
        icon={session && session.user ? "more" : "user"}
        text={loading ? '' : !session || !session?.user ? 'Login' : 'Logout'}
        onClick={() => {(!session && !loading) ? signIn() : signOut()}}
        style={{ marginLeft: '5px' }}
    />
  )
}


const ModalButton = () => {
  const [session, loading] = useSession()
  const dispatch = useContext(NewSlugStore.Dispatch)

  return (
    <Button
      fill={true}
      minimal={true}
      alignText="right"
      size="small" 
      icon="dashboard"
      loading={loading}
      onClick={() => {
          dispatch({
            type: 'openModal',
            payload: {
              title: 'Profile',
              description: 'View your profile',
              content:<p> TODOTODO </p>,
              status: 'info',
              tenant: 'dropdownMenu'
            }
        });  
      }}
      text="Profile"
    />
  );
}

const CoverButton = () => {
  const [session, loading] = useSession()

  return (
    <Button 
      loading={loading} 
      // text={session && session?.user ? `${session.user.name}` : 'Login'} 
      minimal={true} 
      // fill={true} 
      alignText="right" 
      rightIcon={
        session && session?.user ? 
          <ProfileAvatar 
            image={session.user.image} 
            name={session.user.name} 
            loading={loading} 
          /> 
        : null
      } 
    />
  )
}

const DropdownMenu = () => {

  let label = <CoverButton />;
  let item1 = { avatar: null, title: <ProfileButton /> };
  let item2 = { avatar: null, title: <ModalButton /> };
  let item3 = { avatar: null, title: <AuthButton /> }; 

  return (
    <Dropdown 
      label={label}
      item1={item1} 
      item2={item2} 
      item3={item3} 
    /> 
  );
}


export default DropdownMenu