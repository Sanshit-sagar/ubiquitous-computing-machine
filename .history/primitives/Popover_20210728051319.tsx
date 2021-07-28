//hi

import React, { useState }  from 'react'
import { styled, keyframes } from '../stiches.config';
import { violet, blackA } from '@radix-ui/colors';
import * as PopoverPrimitive from '@radix-ui/react-popover';

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

type PopoverProps = React.FC<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode;
};

export function StyledPopover({ children, ...props }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpenChange = () => {
        setIsOpen(!isOpen);
    }

    return (
        <PopoverPrimitive.Root 
            {...props} 
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            {children}
        </PopoverPrimitive.Root>
    );
}

const StyledContent = styled(PopoverPrimitive.Content, {
    borderRadius: '2px',
    padding: '5px',
    width: '450px',
    height: '450px',
    border: 'thin solid black',
    backgroundColor: 'white',
    '@media (prefers-reduced-motion: no-preference)': {
      animationDuration: '400ms',
      animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
      '&[data-state="open"]': {
        '&[data-side="top"]': { animationName: slideDownAndFade },
        '&[data-side="right"]': { animationName: slideLeftAndFade },
        '&[data-side="bottom"]': { animationName: slideUpAndFade },
        '&[data-side="left"]': { animationName: slideRightAndFade },
      },
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none'
    },
  });
  
  const StyledArrow = styled(PopoverPrimitive.Arrow, {
    fill: 'white',
  });
  
  const StyledClose = styled(PopoverPrimitive.Close, {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 20,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: violet.violet11,
    position: 'absolute',
    top: 5,
    right: 5,
  
    '&:hover': { backgroundColor: violet.violet4 },
    '&:focus': { boxShadow: 'none', outline: 'none' },
  });
  
  export const Popover = PopoverPrimitive.Root;
  export const PopoverTrigger = PopoverPrimitive.Trigger;
  export const PopoverContent = StyledContent;
  export const PopoverArrow = StyledArrow;
  export const PopoverClose = StyledClose;
  