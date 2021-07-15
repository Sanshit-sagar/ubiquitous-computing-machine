import React from 'react';
import { styled, keyframes } from '../stiches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from './Overlay';
import { panelStyles } from './Panel';
import { IconButton } from './IconButton';

import type * as Polymorphic from '@radix-ui/react-polymorphic';

const showOverlay = keyframes({
    from: { opacity: 0 },
    to: { opacity: 0.3 }
  });
  
const showContent = keyframes({
    from: { opacity: 0, transform: "translate(-50%, -50%) scale(0.85)" },
    to: { opacity: 1, transform: "translate(-50%, -50%)" }
});


type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  ...overlayStyles,
  opacity: 0.3,
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  animation: `${showOverlay} 300ms ease-out`
});

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
  ...panelStyles,
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 150,
  padding: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: '#fff',
  borderRadius: 6,
  animation: `${showContent} 150ms ease-in-out`,
  "&:focus": {
    outline: "none"
  }
});

const StyledCloseButton = styled(IconButton, {
    appearance: "none",
    border: "0",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    padding: 0,
    background: "none",
    color: "white",
    position: "absolute",
    top: 20,
    right: 20,
    outline: "none",
    "&:hover": {
      transform: "scale(1.2)"
    }
});

type DialogContentOwnProps = Polymorphic.OwnProps<typeof DialogPrimitive.Content> & {
  css?: any;
};

type DialogContentComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof DialogPrimitive.Content>,
  DialogContentOwnProps
>;

export const DialogContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <DialogPrimitive.Close as={StyledCloseButton} variant="ghost">
      <Cross1Icon />
    </DialogPrimitive.Close>
  </StyledContent>
)) as DialogContentComponent;

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;