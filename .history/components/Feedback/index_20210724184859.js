import React, { useContext, useState } from 'react';
import { NewSlugStore } from '../../store'

import { styled, keyframes } from '../../stiches.config'
import {  
    Popover, 
    PopoverTrigger, 
    PopoverContent,
    PopoverArrow, 
    PopoverClose 
} from '../../primitives/PopoverForm';

import { Fieldset } from '../../primitives/LabelledInput'
import { Button } from '../../primitives/Button'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { TextArea } from '../../primitives/TextArea'
import { Text } from '../../primitives/Text'
import StyledTooltip from '../../primitives/Tooltip'
import StyledSeparator from '../../primitives/Separator'

import { Cross2Icon } from '@radix-ui/react-icons'
import { violet, blackA, gainsboro } from '@radix-ui/colors'

import toast from 'react-hot-toast'

const PaperPlaneSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20307 1.04312C1.00481 0.954998 0.77234 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568116 1.75196L3.92115 7.50002L0.568116 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.77234 13.9952 1.00481 14.045 1.20307 13.9569L14.7031 7.95692C14.8836 7.87667 15 7.69761 15 7.50002C15 7.30242 14.8836 7.12336 14.7031 7.04311L1.20307 1.04312ZM4.84552 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22091 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22091 7.10002 9 7.10002H4.84552Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const EnvelopeClosedSvg = () => {

    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const CrumpledPaperSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const FaceSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82708 7.49972C1.82708 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82708 10.6327 1.82708 7.49972ZM5.03747 9.21395C4.87949 8.98746 4.56782 8.93193 4.34133 9.08991C4.11484 9.24789 4.05931 9.55956 4.21729 9.78605C4.93926 10.8211 6.14033 11.5 7.50004 11.5C8.85974 11.5 10.0608 10.8211 10.7828 9.78605C10.9408 9.55956 10.8852 9.24789 10.6587 9.08991C10.4323 8.93193 10.1206 8.98746 9.9626 9.21395C9.41963 9.99238 8.51907 10.5 7.50004 10.5C6.481 10.5 5.58044 9.99238 5.03747 9.21395ZM5.37503 6.84998C5.85828 6.84998 6.25003 6.45815 6.25003 5.97498C6.25003 5.4918 5.85828 5.09998 5.37503 5.09998C4.89179 5.09998 4.50003 5.4918 4.50003 5.97498C4.50003 6.45815 4.89179 6.84998 5.37503 6.84998ZM10.5 5.97498C10.5 6.45815 10.1083 6.84998 9.62503 6.84998C9.14179 6.84998 8.75003 6.45815 8.75003 5.97498C8.75003 5.4918 9.14179 5.09998 9.62503 5.09998C10.1083 5.09998 10.5 5.4918 10.5 5.97498Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const RocketshipSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const ClosedEyeSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7649 6.07595C14.9991 6.22231 15.0703 6.53078 14.9239 6.76495C14.4849 7.46742 13.9632 8.10644 13.3702 8.66304L14.5712 9.86405C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30816C11.8049 9.90282 10.9089 10.3621 9.93374 10.651L10.383 12.3276C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76266 13.0115 9.4885 12.8532 9.41703 12.5864L8.95916 10.8775C8.48742 10.958 8.00035 10.9999 7.5 10.9999C6.99964 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97063 12.94C4.7039 12.8685 4.5456 12.5944 4.61706 12.3277L5.06624 10.651C4.09111 10.3621 3.19503 9.90281 2.3989 9.30814L1.1359 10.5711C0.940638 10.7664 0.624058 10.7664 0.428797 10.5711C0.233537 10.3759 0.233537 10.0593 0.428797 9.86404L1.62982 8.66302C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53078 0.000898544 6.22231 0.235064 6.07595C0.46923 5.9296 0.777703 6.00078 0.924057 6.23495C1.40354 7.00212 1.989 7.68056 2.66233 8.2427C2.67315 8.25096 2.6837 8.25971 2.69397 8.26897C4.00897 9.35527 5.65536 9.9999 7.5 9.9999C10.3078 9.9999 12.6563 8.50629 14.0759 6.23495C14.2223 6.00078 14.5308 5.9296 14.7649 6.07595Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const YinYangSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const EnvelopeOpenSvg = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94721 0.164594C7.66569 0.0238299 7.33431 0.0238302 7.05279 0.164594L0.552786 3.41459C0.214002 3.58399 0 3.93025 0 4.30902V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V4.30902C15 3.93025 14.786 3.58399 14.4472 3.41459L7.94721 0.164594ZM13.5689 4.09349L7.5 1.05902L1.43105 4.09349L7.5 7.29136L13.5689 4.09349ZM1 4.88366V12H14V4.88366L7.70977 8.19813C7.57848 8.26731 7.42152 8.26731 7.29023 8.19813L1 4.88366Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

const IconButton = styled('button', {
    appearance: 'none', 
    height: 37.5,
    backgroundColor: 'white',
    padding: '10px',
    boxShadow: 'inset 0 0 0 1px gainsboro',
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontail: 5,
  
    '&:focus': {
      outline: 'none',
      border: 'none',
    },
  
    '&[data-state=on]': {
      backgroundColor: '#567112',
    },
  
    "&:hover": {
      backgroundColor: 'gainsboro',
    },
});


const reactionIcons = [
    { id: 'trash', icon: CrumpledPaperSvg, feeling: 'This app and crumpled paper, both belong in da trash', color: 'red' },
    { id: 'mixedFeelings', icon: YinYangSvg, feeling: 'It reminded me of badly done feng shui', color: 'black' },
    { id: 'goodEnough', icon: FaceSvg, feeling: 'It did its job - expect an interview', color: 'yellow' },
    { id: 'bestEver', icon: RocketshipSvg, feeling: 'Amaahzing, its as good as commercial space flight', color: 'green'},
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
        <Box css={{ backgroundColor: '$loContrast' }}>
            <Flex css={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', gap: 10 }}>
                
                <Flex css={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
                    <span className="text-pink-500">
                        <EnvelopeOpenSvg />
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
                                <PaperPlaneSvg />
                            </Box>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            
            <PopoverArrow />
            
            <PopoverClose aria-label="Close">
                <Button color="white"> 
                    <Cross2Icon />
                </Button>
            </PopoverClose>
        </Box>
    )
}

const FeedbackForm = () => {

    return (
        <Popover>
            <PopoverTrigger as={IconButton}>
                <span style={{ width: '85px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="text-sm font-extralight">
                        <EnvelopeClosedSvg />
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