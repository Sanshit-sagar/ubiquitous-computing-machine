import { providers, signIn } from 'next-auth/client'
import styles from '../../styles/Home.module.css'

import {BorderBox, Pagehead, Button} from '@primer/components'
import {AnchorButton} from '@blueprintjs/core'

export default function SignIn({ providers }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
          <BorderBox border="thin solid black" borderRadius="5px" padding="5px">
            <Pagehead>
              <h1> Login </h1>
            </Pagehead>

            <>
              {Object.values(providers).map(provider => (
                <div key={provider.name}>

                    <AnchorButton 
                      onClick={() => signIn(provider.id)}
                      large={true}
                      
                    >
                      Sign in with {provider.name}
                    </AnchorButton>

                </div>
              ))}
            </>
          </BorderBox>
      </div>
    </div>
  )
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers()
  }
}