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
import Button from '../../primitives/Button'

import SlugViews from './SlugViews'
import SlugDetails from './SlugDetails'
import SlugClickstream from './ClickstreamPreview'
import StyledSeparator from '../../primitives/Separator'
import AccessibleStyledButton from '../../primitives/AccessibleStyledButton'

import { SlugViews } from './SlugViews'

import { CornersIcon } from '@radix-ui/react-icons'


import { Button } from '../../primitives/Button'
import Trendline from '../Trendline'
import { ellipses } from '../../lib/utils'


// function formatDestination(url) {
//     let urlObj = new URL(url);
//     return urlObj.hostname;
// }

// function formatDetails(details) {
//     return {
//         slug: details ? details?.slug || '' : '',
//         destination: details && details?.url ? formatDestination(details.url) : '',
//         ...details?.config,
//     };
// }




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
        // toast.success(`Closing dialog...`);
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
                <Flex css={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <DialogTitle>
                        {name}
                    </DialogTitle>

                    <DialogClose as={Button}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <StyledSeparator orientation={'horizontal'} />
                    <SlugClickstream slug={name} />
                    <SlugDetails slug={name} />
                    <SlugViews slug={name} />
                </DialogDescription>

                <Flex css={{ marginTop: 25, fd: 'row', jc: 'flex-end', ai: 'flex-end', mb: '$1', mr: '$1', justifyContent: 'flex-end' }}>
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