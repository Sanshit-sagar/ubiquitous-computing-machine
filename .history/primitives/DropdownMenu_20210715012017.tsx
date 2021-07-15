import { styled } from '@stitches/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import { Button } from '@blueprintjs/core'
import { Button } from './Button'

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

// const Image = styled('img', {
//   width: 24,
//   height: 24,
//   borderRadius: 9999,
//   marginRight: 10,
// });

const Dropdown = ({ item1, item2, item3 }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="ghost"> 
        Trigger
      </Button>
    </DropdownMenu.Trigger>
    <StyledContent>
      <StyledItem onSelect={() => console.log(`Selected ${item1.title}`)}>
        {item1.avatar}
        {item1.title}
      </StyledItem>
      <StyledItem onSelect={() => console.log(`Selected ${item2.title}`)}>
        {item2.avatar}
        {item2.title}
      </StyledItem>
      <StyledItem onSelect={() => console.log(`Selected ${item3.title}`)}>
        {item3.avatar}
        {item3.title}
      </StyledItem>
      <StyledArrow />
    </StyledContent>
  </DropdownMenu.Root>
);

export default Dropdown