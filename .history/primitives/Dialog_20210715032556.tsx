import { styled } from 'path-to/stitches.config';
import * as Dialog from '@radix-ui/react-dialog';

const StyledOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .15)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const StyledContent = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxWidth: 'fit-content',
  maxHeight: '85vh',
  padding: 20,
  marginTop: '-5vh',
  backgroundColor: 'white',
  borderRadius: 6,

  '&:focus': {
    outline: 'none',
  },
});

const InformationDialog = () => {
    
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                Open
            </Dialog.Trigger>
            
            <StyledOverlay />
            
            <StyledContent>
                <Dialog.Title>Booking a flight</Dialog.Title>
                <Dialog.Description>
                    Please enter your information below in order to book the
                    flight.
                </Dialog.Description>
                <Dialog.Close>
                    Close
                </Dialog.Close>
            </StyledContent>
        </Dialog.Root>
    );
}

export default InformationDialog