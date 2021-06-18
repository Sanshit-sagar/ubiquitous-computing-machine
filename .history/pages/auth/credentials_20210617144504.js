// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import StackedLayout from '../../sections/StackedLayout'

export default function Page () {
  const [response, setResponse] = React.useState(null)
  
  const handleLogin = (options) => async () => {
    if (options.redirect) {
      return signIn('credentials', options)
    }
    const response = await signIn('credentials', options)
    setResponse(response)
  }

  const handleLogout = (options) => async () => {
    if (options.redirect) {
      return signOut(options)
    }
    const response = await signOut(options)
    setResponse(response)
  }

  const [session] = useSession()

  if (session) {
    return (
      <StackedLayout>
        <h1> Credentials Log Out </h1>
        
        <button onClick={handleLogout({ redirect: true })}>
          Logout
        </button>
        
        <br />

        <button onClick={handleLogout({ redirect: false })}>
          Logout
        </button><br />
        
        <p>Response:</p>
        <pre className="bg-indigo-700 text-white">
          {JSON.stringify(response, null, 2)}
        </pre>

      </StackedLayout>
    )
  }

  return (
    <StackedLayout>
      <h1>Test different flows for Credentials login</h1>
      <span className='spacing'>Default:</span>
      <button onClick={handleLogin({ redirect: true, password: 'password' })}>Login</button><br />
      <span className='spacing'>No redirect:</span>
      <button onClick={handleLogin({ redirect: false, password: 'password' })}>Login</button><br />
      <span className='spacing'>No redirect, wrong password:</span>
      <button onClick={handleLogin({ redirect: false, password: '' })}>Login</button>
      <p>Response:</p>
      <pre style={{ background: '#eee', padding: 16 }}>{JSON.stringify(response, null, 2)}</pre>
    </StackedLayout>
  )
}