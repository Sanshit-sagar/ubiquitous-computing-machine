import { styled } from '../stiches.config'

const ResponsiveBox = styled('div', {
  backgroundColor: '$pink',
  '@bp1': { backgroundColor: '$turq' },
  '@bp2': { backgroundColor: '$orange' },
});

export default ResponsiveBox