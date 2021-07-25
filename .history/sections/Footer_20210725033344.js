import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Link } from '../primitives/Link'

import { blackA, mauve } from '@radix-ui/colors'
import { GitHubIcon } from '@radix-ui/react-icons'

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
                            
                            <Box css={{ my: '1', width: '100%' }}>
                                <Link href="#switch1" variant="subtle" css={{ display: 'inline-flex', width: '100%', mr: '2' }}>
                                    <Text size="1">
                                        MIT License
                                    </Text>
                                </Link>
                            </Box>

                            <FooterLink name="Changelog" href={`/#`} />
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