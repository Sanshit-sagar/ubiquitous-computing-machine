

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
                        large={true}
                        
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default SignIn