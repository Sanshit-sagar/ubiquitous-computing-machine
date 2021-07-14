import { styled } from '@stitches/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const StyledContent = styled(DropdownMenu.Content, {
  minWidth: 130,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 5px 15px -5px hsla(206,22%,7%,.15)',
});

const StyledItem = styled(DropdownMenu.Item, {
  fontSize: 13,
  padding: '5px 10px',
  borderRadius: 3,
  cursor: 'default',

  '&:focus': {
    outline: 'none',
    backgroundColor: 'dodgerblue',
    color: 'white',
  },
});

const StyledArrow = styled(DropdownMenu.Arrow, {
  fill: 'white',
});

const DropdownMenu () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      DropdownMenu
    </DropdownMenu.Trigger>
    
    <StyledContent>
      <StyledItem onSelect={() => console.log('cut')}>
        Cut
      </StyledItem>
      <StyledItem onSelect={() => console.log('copy')}>
        Copy
      </StyledItem>
      <StyledItem onSelect={() => console.log('paste')}>
        Paste
      </StyledItem>
      <StyledArrow />
    </StyledContent>
  </DropdownMenu.Root>
);

export default DropdownMenu