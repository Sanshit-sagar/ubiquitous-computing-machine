import React from 'react'
import { IconButton } from '../../primitives/IconButton'
import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'

import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogClose, 
    DialogTitle, 
    DialogDescription 
} from '../../primitives/Dialog'

import { ellipses } from '../../lib/utils'

import { Text } from '../../primitives/Text'
import { Cross2Icon } from '../../primitives/Icons'
import { SlugViews } from './SlugViews'

import useSWR from 'swr'

// const handleCopy = () => {
//     toast((t) => (
//         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
//                 Copied successfully! Try it out: 
//             <button onClick={() => toast.dismiss(t.id)}>
//                 Dismiss
//             </button>
//             </div>

//             <input 
//                 placeholder="Paste it here" 
//                 style={{ border: 'thin solid black', borderRadius: '5px', marginTop: '10px', padding: '2.5px' }} 
//             />
//         </div>
//     ));   
// }

// export const useSlugDetails = (slug) => {
//     const { data, error } =  useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);
//     console.log(data ? `got the data ${JSON.stringify(data)}` : 'no data');

//     return {
//         details: data ? data.details : null,
//         loading: !data && !error,
//         error
//     }; 
// }


const SlugProfile = ({ name }) => {
    return (
        <Dialog>
            <DialogContent>
                <Flex css={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <DialogTitle>
                        {name}
                    </DialogTitle>

                    <DialogClose as={IconButton}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <Text> Details for {name} here </Text>
                    {/* <SlugViews slug={name} /> */}
                </DialogDescription>

                <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                    <DialogClose key="green" as={Button}>
                        Save changes
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-end', gap: '10px', width: '200px' }}>
                <span className="text-xs font-extralight flex flex-wrap">
                    {ellipses(name, 25)} 
                </span>
                
                <DialogTrigger>
                    <Button>
                        open
                    </Button>
                </DialogTrigger>
            </Flex>
        </Dialog>
    );
}

export default SlugProfile