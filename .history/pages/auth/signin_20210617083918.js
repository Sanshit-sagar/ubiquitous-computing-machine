

const SignIn = () => {

    return (
        <div>
            <h1> Login 
                <code> cute.ly </code>
            </h1>
            {Object.values(providers).map(provider => (
                <div key={provider.name} className="px-6 py-4 whitespace-nowrap">
                    <button 
                        onClick={() => signIn(provider.id)}
                        className="bg-green-600 px-2 py-2 text-white font-light"
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default SignIn