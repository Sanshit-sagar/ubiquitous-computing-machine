import { providers, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {

    return (
        <div className="container">
            <div className="rounded-md px-3 py-3 shadow border-">
                
                <div className="bg-gray-300">
                    <h1>
                        Login 
                        <code> cute.ly </code>
                    </h1>
                </div>

                {Object.values(providers).map(provider => (
                    <div key={provider.name} className="px-6 py-4 whitespace-nowrap">
                        return(
                            <button 
                                onClick={() => signIn(provider.id)}
                                className="bg-green-600 px-2 py-2 text-white font-light"
                            >
                                Sign in with {provider.name}
                            </button>
                        );
                    </div>
                ))}
            </div>
        </div>
    )
}


SignIn.getInitialProps = async () => {
    return {
      providers: await providers()
    }
}
