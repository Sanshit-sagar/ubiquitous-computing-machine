//hi

import { styled } from '../stiches.config'

const ResponsiveBox = styled('div', {
    variants: {
        color: {
          pink: { backgroundColor: '$pink' },
          turq: { backgroundColor: '$turq' },
          orange: { backgroundColor: '$orange' },
        },
    },
}); 

export default ResponsiveBox