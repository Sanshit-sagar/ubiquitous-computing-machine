import { AccessibleIcon } from './AccessibleIcon'
import { Button } from './Button';
import { Text } from './Text'
import { Box } from './Box'

const AccessibleStyledButton = ({ icon, content, label }) => {

    return (        
        <Button>
            <AccessibleIcon label={label}>
                {icon}
            </AccessibleIcon>
            <Box css={{ my: '$1' }}>
                <span className="text-sm font-extralight"> {content} </span>
            </Box>
        </Button>
    )
}

export default AccessibleStyledButton 