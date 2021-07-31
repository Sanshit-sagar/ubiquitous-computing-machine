import { styled } from '../stiches.config'
import * as LabelPrimitive from '@radix-ui/react-label';

export const Label = styled.label`
display: block;
text-align: left;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
font-size: 14px;
`;

const Label = StyledLabel
export default Label;export const Wrapper = styled.div`
display: inline-flex;
flex-direction: column;
position: relative;
margin-top: 20px;
`;
