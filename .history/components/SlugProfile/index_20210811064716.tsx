import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogClose, 
    DialogTitle, 
    DialogDescription 
} from '../../primitives/Dialog'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'

import SlugViews from './SlugViews'
import SlugDetails from './SlugDetails'
import SlugClickstream from './MiniClickstream'
import StyledSeparator from '../../primitives/Separator'
import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'


import { CornersIcon, Cross2Icon, CheckIcon } from '@radix-ui/react-icons'

import { ellipses } from '../../lib/utils'
import toast from 'react-hot-toast'



const DialogTriggerButton = ({ name }) => {

    return (
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '10px', width: '200px' }}>
            <Text size='$1'>{ellipses(name, 20)}</Text>
            
            <DialogTrigger>
                <Button>
                    <CornersIcon />
                </Button>
            </DialogTrigger>
        </Flex>
    )
}


const SlugProfileActionButtons = () => {

    const handleCloseCleanup = () => {
        toast.success(`Closing dialog...`);
    }

    return (
        <AccessibleStyledButton
            icon={<CheckIcon />}
            content={<Text> Save </Text>}
            label={'Close Modal Button'}
            handleClick={handleCloseCleanup}
        />
    )
}



const SlugProfile = ({ name }) => {
    return (
        <Dialog>
            <DialogContent>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                    <DialogTitle> {name} </DialogTitle>
                    <DialogClose as={Button}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <StyledSeparator orientation={'horizontal'} />
                    <SlugClickstream value={name} />
                    <SlugDetails slug={name} />
                    <SlugViews slug={name} />
                </DialogDescription>

                <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end', mt: 25, mb: '$1', mr: '$1' }}>
                    <DialogClose key="green" as={'div'}>
                        <SlugProfileActionButtons />
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <DialogTriggerButton name={name} />
        </Dialog>
    );
}

export default SlugProfile