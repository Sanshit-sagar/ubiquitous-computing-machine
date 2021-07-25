import React from 'react';

import { styled, keyframes } from '../stiches.config'
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { violet, blackA } from '@radix-ui/colors';
import { Slot } from '@radix-ui/react-slot';

const StyledTooltip = ({ children, content, open, defaultOpen, onOpenChange, ...props }) => {
  
  
const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

  
const StyledContent = styled(TooltipPrimitive.Content, {
    borderRadius: 4,
    padding: '10px 15px',
    fontSize: 15,
    lineHeight: 1,
    color: violet.violet11,
    backgroundColor: 'white',
    border: 'thin solid black',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
      animationDuration: '400ms',
      animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
      '&[data-state="delayed-open"]': {
        '&[data-side="top"]': { animationName: slideDownAndFade },
        '&[data-side="right"]': { animationName: slideLeftAndFade },
        '&[data-side="bottom"]': { animationName: slideUpAndFade },
        '&[data-side="left"]': { animationName: slideRightAndFade },
      },
    },
  });
  
  const StyledArrow = styled(TooltipPrimitive.Arrow, {
    fill: 'black',
  });


  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={0}
    >
      <TooltipPrimitive.Trigger as={Slot}>
        {children}
      </TooltipPrimitive.Trigger>

      <StyledContent side="right" sideOffset={5} align="center" {...props}>
        {content}
        <StyledArrow />
      </StyledContent>

    </TooltipPrimitive.Root>
  );
}

export default StyledTooltip