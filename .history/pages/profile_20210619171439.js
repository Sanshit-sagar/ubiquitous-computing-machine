import React from 'react';
import { useSession } from 'next-auth/client'

function Profile() {
  const [session, loading] = useSession()

  if (loading) return <div>Loading...</div>;
  if (!session && !loading) return <div> <p> error...</p></div>;
  
  return (  
    <>
      <img src={session.user.image} alt="user profile" height={500} width={500} /> 
      <h1> {session.user.name} </h1>
      <subtitle> {session.user.email} </subtitle>
    </>
  );
}

export default Profile