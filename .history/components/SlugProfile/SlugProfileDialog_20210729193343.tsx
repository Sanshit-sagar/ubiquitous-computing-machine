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


const SlugDetailsDialog = ({ slugName, }) => {
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
                    <DialogClose as={Button} aria-label="Close" variant="green">
                        Save changes
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '275px' }}>
                <DialogTrigger>
                    <Button icon="maximize" intent="success" />
                </DialogTrigger>

                <span className="text-xs font-extralight flex flex-wrap">
                    {ellipses(slugName, 25)} 
                </span>
                <span style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button 
                        icon="clipboard" 
                        minimal={true} 
                        intent="none" 
                        onClick={handleCopy}
                    />
                </span>
            </div>
        </Dialog>
    );
}