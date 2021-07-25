import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Link } from '../primitives/Link'

import { blackA, mauve } from '@radix-ui/colors'
import { 
    IdCardIcon, 
    GitHubLogoIcon, 
    EnvelopeClosedIcon, 
    LighteningBoltIcon, 
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
    { id: 'license', title: 'MIT License', href: `#${TODO}`, icon: IdCardIcon, variant: 'subtle' },
    { id: 'changelog', title: 'Changelog', href: `#${TODO}`, icon: FilePlusIcon, variant: 'subtle' },
    { id: 'feedback', title: 'Feedback', href: `#${TODO}`, icon: EnvelopeClosedIcon, variant: 'subtle' },
    { id: 'subscribe', title: 'Subscribe', href: `#${TODO}`, icon: LighteningBoltIcon, variant: 'subtle' },
    { id: 'github', title: 'GitHub (Source)', href: `#${TODO}`, icon: GitHubLogoIcon, variant: 'subtle' },
];

const Footer = ({ handleNavigation, broadcastToast }) => {
  
    return (
        <footer>
            <Box
                css={{
                    position: 'relative',
                    bottom: '0',
                    right: '0',
                    width: '90%',
                    marginLeft: '5%', 
                    marginRight: '5%',
                    py: '$1',
                    px: '$1',
                    backgroundColor: '$loContrast',
                    borderTop: `1px solid #{blackA.blackA12}`,
                    borderRadius: '5px'
                }}
            >
                <Flex css={{ fd: 'row', jc: 'space-between',  ai: 'center' }}>
                    <Box css={{ flexBasis: 1 }}>
                        <Flex css={{ fd: 'row', ai: 'flex-start', jc: 'stretch', width: '100%' }}>
                            {footerLinks.map(function(value, index) {
                                return (
                                    <div key={value.id}>
                                        <FooterLink 
                                            id={index}
                                            name={value.title}
                                            href={value.href}
                                            variant={value.variant}
                                        />
                                    </div>
                                );
                            })} 
                        </Flex>
                    </Box>

                    <Box css={{ flexBasis: 1 }}> 
                        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center' }}>
                            <Button color="gray" outlined>
                                yodude
                            </Button>
                        </Flex>
                    </Box>

                </Flex>
            </Box>
        </footer>
  );
}

export default Footer