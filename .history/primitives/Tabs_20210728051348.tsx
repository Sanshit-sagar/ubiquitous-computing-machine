//hi

import { styled } from '../stiches.config';
import * as Tabs from '@radix-ui/react-tabs';

const StyledTabs = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',
});

const StyledList = styled(Tabs.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: '1px solid gainsboro',
});

const StyledTrigger = styled(Tabs.Trigger, {
  flexShrink: 0,
  padding: '10px 20px',
  color: 'slategray',
  userSelect: 'none',

  '&:hover': { color: 'black' },

  '&[data-state="active"]': {
    color: 'black',
    boxShadow:
      'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
  
  '&:focus': {
    outline: 'none',
  },
});

const StyledContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
});

const HorizontalTabs = ({ tabOne, tabTwo }) => {
    return (
        <StyledTabs defaultValue="tab1">
            <StyledList aria-label="tabs example">
            <StyledTrigger value="tab1">
                {tabOne && tabOne?.title}
            </StyledTrigger>
            <StyledTrigger value="tab2">
                {tabTwo && tabTwo?.title}
            </StyledTrigger>
            </StyledList>
            
            <StyledContent value="tab1">
                {tabOne ? tabOne?.content : 'tab1'} 
            </StyledContent>
            <StyledContent value="tab2">
                {tabTwo ? tabTwo?.content : 'tab2'}
            </StyledContent>
        </StyledTabs>
    );
}

export default HorizontalTabs