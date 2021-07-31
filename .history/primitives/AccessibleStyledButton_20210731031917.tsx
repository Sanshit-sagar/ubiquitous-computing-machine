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
                <span className="text-sm font-extralight"> {content} </span>
            </Box>
        </ActionButton>
    )
}

export default AccessibleStyledButton 