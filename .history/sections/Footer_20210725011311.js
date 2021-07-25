import React from "react";

import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Link } from '../primitives/Link'

const Footer = () => {
  
    return (
        <footer>
            <Box
                css={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    py: '$1',
                    px: '$2',
                    backgroundColor: '$loContrast',
                    borderBottom: '1px solid $canvas',
                }}
            >
                <Flex css={{ fd: 'row', jc: 'space-between',  ai: 'center' }}>
                    <Box css={{ flexBasis: 1 }}>
                        <Flex css={{ fd: 'row', ai: 'center', jc: 'center' }}>
                            
                            <Box css={{ my: '$1' }}>
                                <Link href="#switch1" variant="subtle" css={{ display: 'inline-flex' }}>
                                    <Text size="2" css={{ lineHeight: '20px' }}>
                                        Switch1
                                    </Text>
                                </Link>
                            </Box>

                            <Box css={{ my: '$1' }}>
                                <Link href="#switch2" variant="subtle" css={{ display: 'inline-flex' }}>
                                    <Text size="2" css={{ lineHeight: '20px' }}>
                                        Switch2
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