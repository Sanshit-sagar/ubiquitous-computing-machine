import { AccessibleIcon } from './AccessibleIcon'
import ActionButton from './ActionButton';
import { Text } from './Text'
import { Box } from './Box'

const AccessibleStyledButton = ({ icon, content, label }) => {

    return (        
        <ActionButton>
            <AccessibleIcon label={label}>
                {icon}
            </AccessibleIcon>
            <Box css={{ my: '$1' }}>
                <Text> {content} </Text>
            </Box>
        </ActionButton>
    )
}

export default AccessibleStyledButton 