//hi

import { styled } from '../stiches.config'
import * as LabelPrimitive from '@radix-ui/react-label';

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  color: 'black',
  userSelect: 'none',
});

const Label = StyledLabel
export default Label;