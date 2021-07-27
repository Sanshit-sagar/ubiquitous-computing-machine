import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Button } from '../primitives/Button'
import { Text } from '../primitives/Text'
import { Link } from '../primitives/Link'
import StyledTooltip from '../primitives/Tooltip'
import { AccessibleIcon } from '../primitives/AccessibleIcon'

import FeedbackPopover from '../components/Feedback'
import { 
    IdCardIcon, 
    GitHubLogoIcon, 
    RocketIcon, 
    LightningBoltIcon,
    FilePlusIcon 
} from '@radix-ui/react-icons'

const FooterLink = ({ name, href, variant }) => {
    return (
        <Box css={{ my: '$1' }}>
            <Link 
                href={`${href}`} 
                variant={`${variant}`}
                css={{ display: 'inline-flex' }}
            >
                <Text 
                    size="1" 
                    css={{ lineHeight: '20px' }}
                >
                    {name}
                </Text>
            </Link>
        </Box>
    )
}

const footerLinks = [
    { id: 'license', title: 'License', icon: IdCardIcon, variant: 'blue', href: `https://`, description: 'Open Source Version of License'},
    { id: 'changelog', title: 'Changelog', icon: FilePlusIcon, variant: 'blue',  href: `https://`, description: 'Been tracking updates to versions with semver - captured in this changelog'},
    { id: 'roadmap', title: 'Roadmap', icon: RocketIcon, variant: 'blue', href: `https://`, description: 'Where I plan on going with this app, and my thoughts on what the process will look like'},
    { id: 'subscribe', title: 'Subscribe', icon: LightningBoltIcon, variant: 'blue', href:`https://`, description: 'By Zeus and all the other gods! This app is so good I MUST subscribe! Thanks!' },
    { id: 'github', title: 'GitHub', icon: GitHubLogoIcon, variant: 'blue', href: `https://www.github.com/sanshit-sagar/ubiquitous-computing-machine`, description: 'A chonker of an app' },
];


const Footer = ({ handleNavigation, broadcastToast }) => {
  
    return (
        <footer>
            <Box
                css= {{
                    position: 'absolute',
                    width: '75%',
                    bottom: '0',
                    right: '10%',
                    py: '$1',
                    px: '$1',
                    backgroundColor: '$loContrast',
                    borderTop: `1px solid #{blackA.blackA12}`,
                    borderRadius: '5px'
                }}
            >
                <Flex css={{ fd: 'row', jc: 'space-between',  ai: 'center', marginLeft: '5px' }}>
                    <Box css={{ flexBasis: 1, flexShrink: 1, flexGrow: 1, px: '5px', py: '2.5px' }}>
                        <Flex css={{ fd: 'row', ai: 'flex-start', jc: 'stretch', width: '100%' }}>
                            {footerLinks.map(function(value, index) {
                                let tooltipHook = value.title
                                let tooltipDescription = value.description.substring(0,20)

                                return (
                                    <Flex key={value.id} css={{ fd: 'row', jc: 'flex-start', ai: 'center', width: '125px' }}>
                                        <StyledTooltip content={value.description}>
                                            <Button color="gray" outlined>
                                                
                                                <AccessibleIcon label={`${tooltipHook}:${tooltipDescription}`}>
                                                    <value.icon />
                                                </AccessibleIcon>

                                                <FooterLink 
                                                    id={index}
                                                    name={value.title}
                                                    href={value.href}
                                                    variant={value.variant}
                                                    description={value.description}
                                                />

                                            </Button>
                                        </StyledTooltip>
                                    </Flex>
                                );
                            })} 
                        </Flex>
                    </Box>

                    <Box css={{ flexBasis: 1 }}> 
                        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
                            <FeedbackPopover />
                        </Flex>
                    </Box>

                </Flex>
            </Box>
        </footer>
  );
}

export default Footer