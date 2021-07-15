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
  borderRightRadius: '5px',
  margin: '35px 0px 0px 0px',
  border: 'thin solid gray',
  borderRadius: '5px',
});

const StyledTrigger = styled(Tabs.Trigger, {
    flexShrink: 0,
    flexGrow: 0,
    padding: '10px 20px',
    color: 'slategray',
    userSelect: 'none',
    width: '200px',

    '&:hover': { 
        color: 'black',
        border: 'thin solid gray',
        borderRadius: '5px',
        padding: '10px'
    },

    '&[data-state="active"]': {
        color: 'black',
        boxShadow: 'inset -1px 0 0 currentColor, 1px 0 0 currentColor',
    },
});

const StyledContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
});

const VerticalTabs = ({ urlInput, slugInput, ttlInput, blacklistInput, encryptionInput, campaignTracker }) => {
    
    let tabItems = [
        {id: 'url', title: 'Destination URL', content: urlInput },
        {id: 'slug', title: 'Personalized Slug', content: slugInput },
        {id: 'ttl', title: 'Expiration Date', content: ttlInput },
        {id: 'blacklist', title: 'IP Blacklists', content:  blacklistInput },
        {id: 'security', title: 'Security', content: encryptionInput },
        {id: 'utm', title: 'Campaign Tracking', content: campaignTracker},
        // {id: 'abtesting', title: 'A/B Testing', content: },
        // {id: 'routing', title: 'Routing Codes', content: },
    ];

    return (

        <StyledTabs defaultValue="url" orientation="vertical">
            <StyledList aria-label="New Slug Options">
                {tabItems.map(function(tab, i) {
                    return (
                        <StyledTrigger key={i} value={tab.id}> 
                            {tab.title}
                        </StyledTrigger>
                    );
                })}
            </StyledList>

            <>
                {tabItems.map(function(tab, j) {
                    return (
                        <StyledContent key={j} value={tab.id}> 
                            {tab.content} 
                        </StyledContent>
                    );
                })}
           </>
        </StyledTabs>
    );
}

export default VerticalTabs