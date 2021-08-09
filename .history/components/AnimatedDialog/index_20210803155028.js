import * as Dialog from '@radix-ui/react-dialog';
// import { useTransition, animated, config } from 'react-spring';

export const AnimatedDialog = ({ dialogOpen, toggleDialog }) => {
  // const [open, setOpen] = React.useState(false);
  // const transitions = useTransition(open, null, {
  //   from: { opacity: 0, y: -10 },
  //   enter: { opacity: 1, y: 0 },
  //   leave: { opacity: 0, y: 10 },
  //   config: config.stiff,
  // });
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={toggleDialog}>

      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      {transitions.map(({ item, props: styles }) =>
        item ? (
          <React.Fragment>
            <Dialog.Overlay
              forceMount
              // as={animated.div}
              key={item}
              style={{ opacity: styles.opacity }}
            />
            <Dialog.Content
              forceMount
              as={animated.div}
              style={{ opacity: styles.opacity }}
            >
              <h1>Hello from inside the Dialog!</h1>
              <Dialog.Close>close</Dialog.Close>
            </Dialog.Content>
          </React.Fragment>
        ) : null
      )}
    </Dialog.Root>
  );
}