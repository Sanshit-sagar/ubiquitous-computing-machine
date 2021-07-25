import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { styled } from '../stiches.config'
import { violet } from '@radix-ui/colors'

import Loader from '../components/Loader'

const Avatar = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 24,
  height: 24,
  borderRadius: 12,
  appearance: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
});

export const Image = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const Fallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'dodgerblue',
});

export const TooltipTrigger = styled(Tooltip.Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
});

export const TooltipContent = styled(Tooltip.Content, {
  borderRadius: 3,
  padding: '5px 10px',
  fontSize: 14,
  backgroundColor: 'gainsboro',
  color: 'black',
});