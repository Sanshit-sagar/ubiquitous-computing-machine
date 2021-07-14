import { styled } from '@stitches/react';
import * as Progress from '@radix-ui/react-progress';

const StyledProgress = styled(Progress.Root, {
  position: 'relative',
  height: 10,
  overflow: 'hidden',
  borderRadius: 5,
  background: 'gainsboro',
});


const StyledIndicator = styled(Progress.Indicator, {
  boxSizing: 'border-box',
  position: 'absolute',
  backgroundColor: 'dodgerblue',
  height: '100%',
});

const ProgressBar = ({ progressPercentage }) => (
  <StyledProgress value={progressPercentage}>
    <StyledIndicator 
        style={{ width: `${progressPercentage}%` }} 
    />
  </StyledProgress>
);

export default ProgressBar