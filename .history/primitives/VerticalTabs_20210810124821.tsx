
import React, { useState, useContext, useEffect } from 'react'

import { styled } from '@stitches/react'
import * as Tabs from '@radix-ui/react-tabs'
import { violet, blackA } from '@radix-ui/colors'

import { NewSlugStore, GlobalStore } from '../store'

const StyledTabs = styled(Tabs.Root, {
    display: 'flex',
    backgroundColor: 'transparent',
});

const StyledList = styled(Tabs.List, {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    margin: '35px 0px 0px 0px',
    minHeight: '100px',
    height: '300px',
    width: '225px',
    backgroundColor: 'transparent',
    border: `thin solid ${blackA.blackA5}`,
    boxShadow: `0 2px 10px ${blackA.blackA4}`
});

const StyledTrigger = styled(Tabs.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    height: '50px',
    maxHeight: '50px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    padding: '0px 7.5px 0px 7.5px',
    lineHeight: 1,
    color: blackA.blackA11,
    userSelect: 'none',
    border: `thin solid ${blackA.blackA10}`,
    borderRadius: '4px',

    '&[data-state="active"]': {
      color: violet.violet12,
      backgroundColor: blackA.blackA5,
      outline: 'none',
    },

    '&focus': { 
        outline: 'none', 
        boxShadow: `0 0 0 1px ${blackA.blackA5}` 
    },

    '&:hover': { 
        backgroundColor: blackA.blackA3, 
        color: blackA.blackA11
    },
}); 

const StyledContent = styled(Tabs.Content, {
    flexGrow: 1,
    padding: 20,
});

const emptyMenuStr = 'N/A'

const VerticalTabs = ({ tabItems }) => {
    const state = useContext(NewSlugStore.State)
    const globalState = useContext(GlobalStore.State)
    const globalDispatch = useContext(GlobalStore.Dispatch)

    const [currentTab, setCurrentTab] = useState(tabItems?.length ? tabItems[0].title : emptyMenuStr)

    const dispatchCurrentTab = (title) => {
        globalDispatch({
            type: 'change_tabs',
            payload: {
                value: `${title}`,
            },
        }); 
    }

    const handleTabChange = (title) => {
        setCurrentTab(title);
        dispatchCurrentTab(title);
    }

    useEffect(() => {
        if(!globalState.currentPage?.length && !globalState.currentTab?.length) return;

        if(!globalState.currentTab?.length || globalState.currentTab!==currentTab) {
            dispatchCurrentTab(currentTab);
        }
    }, [currentTab, globalState.currentTab, globalState.currentPage])
    
    return (

        <StyledTabs defaultValue="url" orientation="vertical">
            <StyledList aria-label="New Slug Options">
                {tabItems.map(function(tab, i) {
                    return (
                        <StyledTrigger 
                            key={i} 
                            value={tab.id} 
                            onClick={() => handleTabChange(tab.title)} 
                            disabled={!tab.content}
                        > 
                            <span className="w-full inline-flex justify-between align-stretch">
                                <span className="text-md font-extralight">
                                    <span style={{ backgroundColor: !tab.content ? 'gray' : 'transparent' }}>
                                        {tab.title}
                                    </span>
                                </span>
                                <span 
                                    className={ 
                                        state.validated[`${tab.id}`] 
                                        ? 'text-green-500' : state.hasError[`${tab.id}`] 
                                        ? 'text-red-500' : 'text-yellow-500'
                                    }
                                >
                                    {tab.icon}
                                </span>
                            </span>
                        </StyledTrigger>
                    );
                })}
            </StyledList>

            <>
                {tabItems.map(function(tab, j) {
                    return (
                        <StyledContent 
                            key={j} 
                            value={tab.id}
                        > 
                            {tab.content} 
                        </StyledContent>
                    );
                })}
           </>
        </StyledTabs>
    );
}

export default VerticalTabs