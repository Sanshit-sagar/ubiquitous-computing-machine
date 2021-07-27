import Image from 'next/image' 

import StackedLayout from '../../sections/StackedLayout'
import { Button } from '../../primitives/Button'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { getProviders, signIn } from 'next-auth/client'


export default function SignIn({ providers }) {
    return (
      <StackedLayout>
        <Box css={{ padding: '2px', margin: '2px', border: 'thin solid black', borderRadius: '5px', backgroundColor: 'white'}}>
          <Flex css={{ fd: 'column', jc: 'space-evenly', ai: 'stretch'}}>
            {Object.values(providers).map(provider => (
              <div key={provider.name}>
                <Button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </Button>
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