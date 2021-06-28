import React from "react";
import StackedLayout from '../../sections/StackedLayout'
import { getSession, providers, signIn } from "next-auth/client";

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
    const { req, res, query } = context;
    const session = await getSession({ req });
  
    const { callbackUrl } = query;
  
    if (session && res && session.accessToken) {
      res.writeHead(302, {
        Location: callbackUrl,
      });
      res.end();
      return;
    }
  
    return {
      session: undefined,
      providers: await providers(context),
    };
};