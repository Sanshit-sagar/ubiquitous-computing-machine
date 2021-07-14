import { styled } from '@stitches/react';
import * as Tabs from '@radix-ui/react-tabs';

const StyledTabs = styled(Tabs.Root, {
  display: 'flex',
});

const StyledList = styled(Tabs.List, {
  flexShrink: 0,
  flexDirection: 'column',
  display: 'flex',
  borderRight: '1px solid gainsboro',
});

const StyledTrigger = styled(Tabs.Trigger, {
  flexShrink: 0,
  padding: '10px 20px',
  color: 'slategray',
  userSelect: 'none',

  '&:hover': { color: 'black' },

  '&[data-state="active"]': {
    color: 'black',
    boxShadow: 'inset -1px 0 0 currentColor, 1px 0 0 currentColor',
  },
});

const StyledContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
});

const VerticalTabs = ({ urlInput, slugInput, ttlInput, blacklistInput, encryptionInput, campaignTracker }) => (



  <StyledTabs defaultValue="tab1" orientation="vertical">
    <StyledList aria-label="New Slug Menu">
        <StyledTrigger value="tab1"> 
            Destination URL 
        </StyledTrigger>

        <StyledTrigger value="tab2"> 
            Customized Slug 
        </StyledTrigger>

        <StyledTrigger value="tab3"> 
            Expiration Date 
        </StyledTrigger>

        <StyledTrigger value="tab3"> 
            Expiration Date 
        </StyledTrigger>
        <StyledTrigger value="tab3"> 
            IP Blacklist 
        </StyledTrigger>

        <StyledTrigger value="tab3"> 
            Campaign Tracking
        </StyledTrigger>
    </StyledList>

    <StyledContent value="tab1"> 
        {urlInput} 
    </StyledContent>

    <StyledContent value="tab2"> 
        {slugInput} 
    </StyledContent>

    <StyledContent value="tab3"> 
        {ttlInput} 
    </StyledContent>

    <StyledContent value="tab4"> 
        {blacklistInput} 
    </StyledContent>
    <StyledContent value="tab5"> 
        {encryptionInput} 
    </StyledContent>
    <StyledContent value="tab6"> 
        {campaignTracker} 
    </StyledContent>

  </StyledTabs>
);

export default VerticalTabs