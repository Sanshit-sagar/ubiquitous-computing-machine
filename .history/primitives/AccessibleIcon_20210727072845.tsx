import * as React from 'react';
import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';

const NAME = 'AccessibleIcon';

type AccessibleIconOwnProps = {
  label: string;
};

const StyledAccessibleIcon: React.FC<AccessibleIconOwnProps> = ({ children, label }) => {
  const child = React.Children.only(children);
  
  return (
    <>
        {React.cloneElement(child as React.ReactElement, {
            'aria-hidden': 'true',
            focusable: 'false', 
        })}

        <VisuallyHiddenPrimitive.Root>
          {label}
        </VisuallyHiddenPrimitive.Root>
    </>
  );
};

StyledAccessibleIcon.displayName = NAME;

const AccessibleIcon = StyledAccessibleIcon;
export AccessibleIcon;