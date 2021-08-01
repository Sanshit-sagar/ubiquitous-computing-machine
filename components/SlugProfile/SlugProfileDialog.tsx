import SlugProfile from './index';
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
import toast from 'react-hot-toast'

import { Cross2Icon } from '../../primitives/Icons'

const handleCopy = () => {
    toast((t) => (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                Copied successfully! Try it out: 
            <button onClick={() => toast.dismiss(t.id)}>
                Dismiss
            </button>
            </div>

            <input 
                placeholder="Paste it here" 
                style={{ border: 'thin solid black', borderRadius: '5px', marginTop: '10px', padding: '2.5px' }} 
            />
        </div>
    ));   
}


const SlugProfileDialog = ({ slugName }) => {
    return (
        <Dialog>
            <DialogContent>
                <Flex css={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <DialogTitle>
                        {slugName}
                    </DialogTitle>

                    <DialogClose as={IconButton}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <SlugProfile slug={slugName} />
                </DialogDescription>

                <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                    <DialogClose key="green" as={Button}>
                        Save changes
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-end', gap: '10px', width: '200px' }}>
                <span className="text-xs font-extralight flex flex-wrap">
                    {ellipses(slugName, 25)} 
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

export default SlugProfileDialog