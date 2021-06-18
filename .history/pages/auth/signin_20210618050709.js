import { Button } from "@src/components/buttons";
import Layout from "@src/components/layout";
import React from "react";
import { providers, signIn } from "next-auth/client";

const SignIn = ({ providers }) => (
    <Layout>
        {Object.values(providers).map((provider) => (
            <div key={provider.name} >
                <Button onClick={() => signIn(provider.id)}> 
                    Login by {provider.name} 
                </Button>
            </div>
        ))}
    </Layout>
);
export default SignIn;

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};