import { providers, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {
  return (
    <div className="h-full w-full flex-col justify-center align-center">
      <div className="h-full w-full flex-col justify-center align-center border-medium rounded-md bg-indigo-700 text-white dark:bg-gray-50 dark:text-black">
            <h1> Login </h1>
            <>
              {Object.values(providers).map(provider => (
                <div key={provider.name}>

                    <button 
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                </div>
              ))}
            </>
      </div>
    </div>
  )
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers()
  }
}