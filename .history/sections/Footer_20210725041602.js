import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Link } from '../primitives/Link'
import { AccessibleIcon } from '../primitives/AccessibleIcon'

import { blackA, mauve } from '@radix-ui/colors'
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
    { id: 'license', title: 'MIT License', icon: IdCardIcon, variant: 'blue', href: `https://`, description: 'Open Source Version of License'},
    { id: 'changelog', title: 'Changelog', icon: FilePlusIcon, variant: 'blue',  href: `https://`, description: 'Been tracking updates to versions with semver - captured in this changelog'},
    { id: 'roadmap', title: 'Roadmap', icon: RocketIcon, variant: 'subtle', href: `https://`, description: 'Where I plan on going with this app, and my thoughts on what the process will look like'},
    { id: 'subscribe', title: 'Subscribe', icon: LightningBoltIcon, variant: 'subtle', href:`https://`, description: 'By Zeus and all the other gods! This app is so good I MUST subscribe! Thanks!' },
    { id: 'github', title: 'GitHub (Source)', icon: GitHubLogoIcon, variant: 'subtle', href: `https://www.github.com/sanshit-sagar/ubiquitous-computing-machine` },
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
                                    <Flex 
                                        key={value.id} 
                                        css={{ 
                                            fd: 'row', 
                                            jc: 'flex-start', 
                                            ai: 'center', 
                                            width: '200px' 
                                        }}
                                    >
                                        <AccessibleIcon label={`${value.title}:${value.description.substring(0,20)}`}>
                                            <value.icon />
                                        </AccessibleIcon>
                                        <FooterLink 
                                            id={index}
                                            name={value.title}
                                            href={value.href}
                                            variant={value.variant}
                                        />
                                    </Flex>
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