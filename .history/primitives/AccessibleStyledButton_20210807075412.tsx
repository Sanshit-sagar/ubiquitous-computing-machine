import { AccessibleIcon } from './AccessibleIcon'
import { Button } from './Button';
import { Text } from './Text'
import { Box } from './Box'

const AccessibleStyledButton = ({ icon, content, label, handleClick, small }) => {
    

    return (        
        <Button onClick={handleClick}>
            <AccessibleIcon label={label}>
                {icon}
            </AccessibleIcon>
            {small 
                ? null :
                <Box css={{ my: small ? '0px' : '$1' }}>
                    <Text> {content} </Text> 
                </Box>
            }
        </Button>
    )
}

export default AccessibleStyledButton 