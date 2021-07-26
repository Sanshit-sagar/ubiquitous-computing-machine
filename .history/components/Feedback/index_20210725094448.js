import React, { useContext, useState } from 'react';
import { NewSlugStore } from '../../store'

import { styled } from '../../stiches.config'
import {  
    Popover, 
    PopoverTrigger, 
    PopoverContent,
    PopoverArrow, 
    PopoverClose 
} from '../../primitives/PopoverForm';
import { 
    CrumpledPaperIcon, 
    Half2Icon, 
    FaceIcon, 
    RocketIcon,
    EnvelopeOpenIcon,
    EnvelopeClosedIcon,
    PaperPlaneIcon
} from '@radix-ui/react-icons'

import { Fieldset } from '../../primitives/LabelledInput'
import { Button } from '../../primitives/Button'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { TextArea } from '../../primitives/TextArea'
import { Text } from '../../primitives/Text'
import StyledTooltip from '../../primitives/Tooltip'
import StyledSeparator from '../../primitives/Separator'

import { Cross2Icon } from '@radix-ui/react-icons'
import { blackA, mauve } from '@radix-ui/colors'
import toast from 'react-hot-toast'

const IconButton = styled('button', {
    all: 'unset',
    backgroundColor: 'white',
    color: mauve.mauve11,
    minHeight: '20px',
    border: '1px solid black',
    borderRadius: '3.5px',
    display: 'flex',
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: '15px',
    justifyContent: 'center',
    '&:hover': { 
      backgroundColor: '$loContrast',
      color: 'white',
    },
    '&[data-state=on]': { 
      backgroundColor: blackA.blackA5, 
      color: 'white',
    },
    '&:focus': { 
      boxShadow: `0 0 0 5px` 
    },
});

const reactionIcons = [
    { id: 'trash', icon: CrumpledPaperIcon, feeling: 'This app and crumpled paper, both belong in da trash', color: 'red' },
    { id: 'mixedFeelings', icon: Half2Icon, feeling: 'It reminded me of badly done feng shui', color: 'black' },
    { id: 'goodEnough', icon: FaceIcon, feeling: 'It did its job - expect an interview', color: 'yellow' },
    { id: 'bestEver', icon: RocketIcon, feeling: 'Amaahzing, its as good as commercial space flight', color: 'green'},
];


const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('')

    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleIncomingFeedback = (event) => {
        setFeedback(event.target.value)
    }

    const handleSubmit = () => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'feedback',
                value: `${feedback}`,
            }
        });

        toast.success(`Thanks for your feedback!`);
        // mutate the db here and check the promise for errors
    }

    return (
        <Box 
            css={{ 
                backgroundColor: '$loContrast', 
            }}
        >
            <Flex css={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', gap: 10 }}>
                
                <Flex 
                    css={{ 
                        flexDirection: 'row', justifyContent: 'flex-start', 
                        alignItems: 'center', paddingLeft: '2.5px', paddingRight: '2.5px', 
                        gap: 3 
                    }}
                >   
                    <span className="text-pink-500">
                        <EnvelopeOpenIcon />
                    </span>
                    <Text bold css={{ fontSize: '12px' }}>
                        FEEDBACK
                    </Text>
                </Flex>
                
                <StyledSeparator />

                <Fieldset>
                    <TextArea 
                        id="userFeedbackInput" 
                        defaultValue='' 
                        placeholder='Your Feedback...' 
                        value={feedback}
                        onChange={handleIncomingFeedback}
                    />
                </Fieldset> 

                <Text light css={{ fontSize: '10px', color: '#128', marginBottom: '2px' }}>
                    Which icon most accurately captures how you feel about this app?
                </Text>

                <Box css={{ width: '100%', backgroundColor: 'white', padding: '$1' }}>
                    <Flex css={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box css={{ marginRight: '5px' }}>
                            <Flex css={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                {reactionIcons.map(function(value, index) {
                                    return (
                                        <StyledTooltip 
                                            key={index}
                                            content={ <span>{value.feeling}</span> }
                                            side="bottom"
                                            defaultOpen={false}
                                        >
                                            <button>
                                                <IconButton key={index}>
                                                    <span className={`text-${value.color}-600`}>
                                                       <value.icon />
                                                    </span>
                                                </IconButton>
                                            </button>
                                        </StyledTooltip>
                                    )
                                })}
                            </Flex>
                        </Box>

                        <Button 
                            css={{ padding: '10px', borderRadius: '5px' }}
                            onClick={handleSubmit}
                        >
                            Send 
                            <Box css={{ ml: '$1' }}>
                                <span className="text-blue-500">
                                    <PaperPlaneIcon />
                                </span>
                            </Box>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            
            <PopoverArrow />
            
            <PopoverClose aria-label="Close">
                <Button color="gray" outlined> 
                    <Cross2Icon />
                </Button>
            </PopoverClose>
        </Box>
    )
}

const FeedbackPopover = () => {

    return (
        <Popover>
            <PopoverTrigger as={IconButton}>
                <span style={{ width: '150px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <span className="text-sm font-extralight">
                        <EnvelopeClosedIcon />
                    </span>
                    <span className="text-sm font-extralight"> 
                        Feedback 
                    </span>
                </span>
            </PopoverTrigger>

            <PopoverContent sideOffset={0}>
                <FeedbackForm />
            </PopoverContent>
        </Popover>
    )
}

export default FeedbackPopover