import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Link } from '../primitives/Link'

const Footer = ({ handleNavigation, broadcastToast }) => {
  
    return (
        <footer>
            <Box
                css={{
                    position: 'relative',
                    bottom: '0',
                    right: '0',
                    width: '80%',
                    py: '$1',
                    px: '$1',
                    backgroundColor: '$loContrast',
                    borderBottom: '1px solid $canvas',
                }}
            >
                <Flex css={{ fd: 'row', jc: 'space-between',  ai: 'center' }}>
                    <Box css={{ flexBasis: 1 }}>
                        <Flex css={{ fd: 'row', ai: 'flex-start', jc: 'stretch', width: '100%' }}>
                            
                            <Box css={{ my: '$1' }}>
                                <Link href="#switch1" variant="subtle" css={{ display: 'inline-flex' }}>
                                    <Text size="1" css={{ lineHeight: '20px' }}>
                                        MIT Liscence
                                    </Text>
                                </Link>
                            </Box>

                            <Box css={{ my: '$1' }}>
                                <Link href="#switch2" variant="subtle" css={{ display: 'inline-flex' }}>
                                    <Text size="2" css={{ lineHeight: '20px' }}>
                                        About
                                    </Text>
                                </Link>
                            </Box>
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