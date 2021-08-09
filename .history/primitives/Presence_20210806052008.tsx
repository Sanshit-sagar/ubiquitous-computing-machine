import React from 'react';
import { useStateMachine } from '../hooks/useStateMachine'
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { css } from '../stiches.config';

export default { title: 'Components/Presence' };

function getAnimationName(styles?: CSSStyleDeclaration) {
    return styles?.animationName || 'none';
}
  

useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;

    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);

      if (present) {
        send('MOUNT');
      } else if (currentAnimationName === 'none' || styles?.display === 'none') {
        // If there is no exit animation or the element is hidden, animations won't run
        // so we unmount instantly
        send('UNMOUNT');
      } else {
        /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */
        const isAnimating = prevAnimationName !== currentAnimationName;

        if (wasPresent && isAnimating) {
          send('ANIMATION_OUT');
        } else {
          send('UNMOUNT');
        }
      }

      prevPresentRef.current = present;
    }
  }, [present, send]);

  useLayoutEffect(() => {
    if (node) {
      /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */
      const handleAnimationEnd = (event: AnimationEvent) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          send('ANIMATION_END');
        }
      };

      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node) {
          // if animation occurred, store its name as the previous animation.
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };

      node.addEventListener('animationstart', handleAnimationStart);
      node.addEventListener('animationcancel', handleAnimationEnd);
      node.addEventListener('animationend', handleAnimationEnd);

      return () => {
        node.removeEventListener('animationstart', handleAnimationStart);
        node.removeEventListener('animationcancel', handleAnimationEnd);
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [node, send]);

  return {
    isPresent: ['mounted', 'unmountSuspended'].includes(state),
    ref: React.useCallback((node: HTMLElement) => {
      if (node) {
        stylesRef.current = getComputedStyle(node);
        setNode(node);
      }
    }, []),
  };
}

type PresenceProps = {
    present: boolean;
    children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
};

const Presence: React.FC<PresenceProps> = (props) => {
    const { present, children } = props;
    const presence = usePresence(present);
  
    const child = (typeof children === 'function'
      ? children({ present: presence.isPresent })
      : React.Children.only(children)) as React.ReactElement;
  
    const ref = useComposedRefs(presence.ref, (child as any).ref);
    const forceMount = typeof children === 'function';
    return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
  };

  function usePresence(present: boolean) {
    const [node, setNode] = React.useState<HTMLElement>();
    const stylesRef = React.useRef<CSSStyleDeclaration>({} as any);
    const prevPresentRef = React.useRef(present);
    const prevAnimationNameRef = React.useRef<string>();
    const initialState = present ? 'mounted' : 'unmounted';
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: 'unmounted',
        ANIMATION_OUT: 'unmountSuspended',
      },
      unmountSuspended: {
        MOUNT: 'mounted',
        ANIMATION_END: 'unmounted',
      },
      unmounted: {
        MOUNT: 'mounted',
      },
    });

export const Basic = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <button onClick={() => setOpen((prevOpen) => !prevOpen)}>toggle</button>

      <Presence present={open}>
        <div>Content</div>
      </Presence>
    </>
  );
};

export const WithMountAnimation = () => <Animation className={mountAnimationClass} />;
export const WithMultipleMountAnimations = () => (
  <Animation className={multipleMountAnimationsClass} />
);
export const WithOpenAndCloseAnimation = () => <Animation className={openAndCloseAnimationClass} />;
export const WithMultipleOpenAndCloseAnimations = () => (
  <Animation className={multipleOpenAndCloseAnimationsClass} />
);

function Animation(props: React.ComponentProps<'div'>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Toggles nodeRef={ref} open={open} onOpenChange={setOpen} />
      <Presence present={open}>
        <div {...props} data-state={open ? 'open' : 'closed'} ref={ref}>
          Content
        </div>
      </Presence>
    </>
  );
}

function Toggles({ open, onOpenChange, nodeRef }: any) {
  function handleToggleVisibility() {
    const node = nodeRef.current;
    if (node) {
      if (node.style.display === 'none') {
        node.style.display = 'block';
      } else {
        node.style.display = 'none';
      }
    }
  }

  return (
    <form style={{ display: 'flex', marginBottom: 30 }}>
      <fieldset>
        <legend>Mount</legend>
        <button type="button" onClick={() => onOpenChange(!open)}>
          toggle
        </button>
      </fieldset>
      <fieldset>
        <legend>Visibility (triggers cancel event)</legend>
        <button type="button" onClick={handleToggleVisibility}>
          toggle
        </button>
      </fieldset>
    </form>
  );
}

const fadeIn = css.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = css.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const slideUp = css.keyframes({
  from: { transform: 'translateY(30px)' },
  to: { transform: 'translateY(0)' },
});

const slideDown = css.keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(30px)' },
});

const mountAnimationClass = css({
  animation: `${fadeIn} 3s ease-out`,
});

const multipleMountAnimationsClass = css({
  animation: `${fadeIn} 6s cubic-bezier(0.22, 1, 0.36, 1), ${slideUp} 6s cubic-bezier(0.22, 1, 0.36, 1)`,
});

const openAndCloseAnimationClass = css({
  '&[data-state="open"]': {
    animation: `${fadeIn} 3s ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 3s ease-in`,
  },
});

const multipleOpenAndCloseAnimationsClass = css({
  '&[data-state="open"]': {
    animation: `${fadeIn} 3s cubic-bezier(0.22, 1, 0.36, 1), ${slideUp} 1s cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 3s cubic-bezier(0.22, 1, 0.36, 1), ${slideDown} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  },
});

export { Presence }; 