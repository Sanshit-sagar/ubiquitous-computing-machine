import { AccessibleIcon } from './AccessibleIcon'
import { Button } from './Button';
import { Text } from './Text'
import { Box } from './Box'

const AccessibleStyledButton = ({ icon, content, label, handleClick }) => {


    return (   
        <Button  onClick={handleClick}>
            <AccessibleIcon label={label}>
                {icon}
            </AccessibleIcon>
                <Box css={{ my: '$1' }}>
                    <Text> {content} </Text> 
                </Box>
        </Button>
    )
}

export default AccessibleStyledButton 