import React from "react";
import { Gith}

const Footer = (props) => {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
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
            <Flex css={{ fd: 'row', ai: 'center', jc: 'space-between' }}>
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
            </Flex>
        </Box>
      </footer>
    </>
  );
}

export default Footer