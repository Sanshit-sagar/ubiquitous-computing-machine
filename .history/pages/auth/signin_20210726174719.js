import Image from 'next/image' 

import StackedLayout from '../../sections/StackedLayout'
import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { FaceIcon } from '@radix-ui/react-icons'

import { getProviders, signIn } from 'next-auth/client'

const metadata = { 
  title:'Authentication', 
  description: 'do it via Google, GitHub, Facebook, Email Link'
}

const AuthProviderButton = ({ id, name }) => {
  return (
    <Button onClick={() => signIn(provider.id)}>
      <AccessibleIcon label={`Auth with ${provider.name}`}> 
        <FaceIcon />
      </AccessibleIcon>
      
      <Box css={{ my: '$1' }}>
        <Text> Sign in with {provider.name} </Text>
      </Box>
    </Button>
  )
}

export default function SignIn({ providers }) {
    return (
      <StackedLayout pageMeta={metadata}>
        <Box css={{ padding: '2px', margin: '2px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          <Flex css={{ fd: 'column', jc: 'space-evenly', ai: 'stretch'}}>
            {Object.values(providers).map(provider => (
              <div key={provider.name}>
                <AuthProviderButton id={provider.id} name={provider.name} />
              </div>
            ))} 
          </Flex>
        </Box>
      </StackedLayout>
    ); 
}

export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}



// <div className="container mx-auto px-4 h-full">
//   <div className="flex content-center items-center justify-center h-full">
//     <div className="w-full lg:w-4/12 px-4">
//       <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
//         <div className="rounded-t mb-0 px-6 py-6">
      
//         </div>
//       </div>
//     </div>
//   </div>
// </div>