import React from "react";
import StackedLayout from '../../sections/StackedLayout'
import { getSession, providers, signIn } from "next-auth/client";

const SignIn = ({ providers }) => {

    return (
        <StackedLayout>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} >
                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => signIn(provider.id)}
                    > 
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