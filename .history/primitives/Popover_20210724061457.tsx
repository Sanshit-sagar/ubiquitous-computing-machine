import React, { useState, useEffect, useContext } from 'react';
import { styled, keyframes } from '../stiches.config';

import type * as Polymorphic from '@radix-ui/react-polymorphic';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Box } from './Box';
import { Flex } from './Flex';

import { panelStyles } from './Panel';

type PopoverProps = React.FC<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode;
};

const slideUp = keyframes({
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideDown = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

export function Popover({ children, ...props }: PopoverProps) {
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
  ...panelStyles,
  '&[data-side="top"]': { animationName: slideUp },
  '&[data-side="bottom"]': { animationName: slideDown },
  animationDuration: '0.6s',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

  minHeight: 400,
  maxHeight: 400,
  borderRadius: 3.5,
  fontSize: 14,
  backgroundColor: '$panel',
  color: '$lowContrast',
  filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.2))',
  width: 400,

  '&:focus': {
    outline: 'none',
  },
});

type PopoverContentOwnProps = Polymorphic.OwnProps<typeof PopoverPrimitive.Content> & {
  css?: any;
  hideArrow?: boolean;
};

type PopoverContentComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof PopoverPrimitive.Content>,
  PopoverContentOwnProps
>;

export const PopoverContent = React.forwardRef(({ children, hideArrow, ...props }, fowardedRef) => (
    <StyledContent 
        {...props} 
        sideOffset={0} 
        ref={fowardedRef}
    >
        <>
            {children}
            {!hideArrow && (
                <Box css={{ color: '$panel' }}>
                    <Flex 
                        css={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-'}}
                        width={11} 
                        height={5} 
                        offset={5} 
                        style={{ fill: 'currentColor' }} 
                    />
                </Box>
            )}
        </>
    </StyledContent>
)) as PopoverContentComponent;

type PopoverTriggerComp = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof PopoverPrimitive.Trigger>,
  Polymorphic.OwnProps<typeof PopoverPrimitive.Trigger>
>;

export const PopoverTrigger = React.forwardRef((props, forwardedRef) => (
    <PopoverPrimitive.Trigger 
        data-radix-popover-trigger 
        {...props} 
        ref={forwardedRef} 
    />
)) as PopoverTriggerComponent;

export const PopoverClose = PopoverPrimitive.Close;