import React from "react";
import StackedLayout from '../../sections/StackedLayout'
import { providers, signIn } from "next-auth/client";

const SignIn = ({ providers }) => {

    return (
        <StackedLayout>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} >
                    <button onClick={() => signIn(provider.id)}> 
                        Login by {provider.name} 
                    </button>
                </div>
            ))}
        </StackedLayout>
    )
}

export default SignIn;

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};