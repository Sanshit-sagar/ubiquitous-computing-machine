import React from "react";
import StackedLayout from '../../sections/StackedLayout'
import { signOut } from "next-auth/client";

const SignOut = () => {

    return (
        <StackedLayout>
            <h3> Sign Out </h3>
            <div key={provider.name} >
                <button onClick={() => signOut()}>
                    logout
                </button>
            </div>
        </StackedLayout>
    )
}

export default SignOut

// SignIn.getInitialProps = async (context) => {
//   return {
//     providers: await providers(context),
//   };
// };