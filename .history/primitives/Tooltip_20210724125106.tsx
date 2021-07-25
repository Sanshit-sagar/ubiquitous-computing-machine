import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Slot } from '@radix-ui/react-slot';

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger as={Slot}>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content side="top" align="center" {...props} as={'div'}>
          {content}
        <TooltipPrimitive.Arrow offset={5} width={11} height={5} as={'div'} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}