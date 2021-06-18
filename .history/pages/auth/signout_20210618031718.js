import { getProviders, signOut } from 'next-auth/client'

function SignOut() {
    
    return (
        <div className="container w-full h-full">
            <button 
                className="bg-red-400 hover:bg-red-800 text-white border-gray-50 rounded-md px-2 py-2 mx-1 my-1 inline-flex justify-center align-stretch"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>
    )
}

export default SignOut

