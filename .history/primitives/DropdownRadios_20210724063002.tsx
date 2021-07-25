import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Content ref={forwardedRef}>
            <div style={{ backgroundColor: 'white', border: 'thin solid black', borderRadius: '5px'}}>
                {children}
            </div>
            <DropdownMenuPrimitive.Arrow />
        </DropdownMenuPrimitive.Content>
    );
  }
);

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPrimitive.ItemIndicator

export const DropdownMenuCheckboxItem = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    
    return (
      <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
        <div style={{ backgroundColor: 'white', height: '35px', width: '125px', border: 'thin solid black', borderRadius: '5px'}}>
            {children}
            <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon />
            </DropdownMenuPrimitive.ItemIndicator>
        </div>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuRadioItem = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
          <div style={{ backgroundColor: 'white', height: '35px', width: '125px', border: 'thin solid black', borderRadius: '5px'}}>
            {children}
            <DropdownMenuPrimitive.ItemIndicator>
              <CheckIcon />
            </DropdownMenuPrimitive.ItemIndicator>
        </div>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;