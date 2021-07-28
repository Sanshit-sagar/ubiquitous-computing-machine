import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'
import { TagInput, Icon, FormGroup, InputGroup } from '@blueprintjs/core'
// import DropdownRadios from '../../primitives/DropdownRadios'

const TagsList = ({ handleDeletion }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <li className="inline-flex justify-start align-start flex-wrap max-w-full">
            {state.seoTags.map(function(value, index) {
                return (
                    <ul key={index}>
                        <Badge 
                            color="pink" 
                        >
                            {value}
                            <Button 
                                onClick={() => {
                                  handleDeletion(index)
                                }}
                                style={{ padding: '1px 2px 1px 2px', margin: '3px 2px 2px 5px', backgroundColor: 'green', color: 'white' }}
                            > 
                                x
                            </Button>
                        </Badge> 
                    </ul>
                )
            })}
        </li> 
    )
}

const TagCategory = ({ category, handleCategoryChange }) => {
  const state = useContext(NewSlugStore.State)

  return (
    <div className="mt-2">
      <select
        label="Select Tag Category"
        onChange={handleCategoryChange}
        icon="header-one"
      >
        {Object.entries(state.keysByCategory).map(function(value, index) {
          return (
            <option 
              key={index}
              value={Object.entries(state.keysByCategory)[index][0]}
            > 
              {Object.entries(state.keysByCategory)[index][0]}
            </option> 
          ); 
        })}
      </select>
    </div>
  );
}



const TagKey = ({ category, handleKeyChange }) => {
  const state = useContext(NewSlugStore.State)

  return (
      <select
        label="Select Tag Key"
        onChange={handleKeyChange}
        icon="key"
      >
        {state.keysByCategory[category].map(function(value, index) {
          return (
            <option 
              key={index}
              value={state.keysByCategory[category][index]}
            > 
              {state.keysByCategory[category][index]}
            </option> 
          ); 
        })}
      </select>
  );
}

const TagValue = ({ handleAddition }) => {
    const [utmTags, setUtmTags] = useState([])

    const handleUtmTagsUpdate = (values) => {
      setUtmTags(values);
    }

    const validateRecentAddition = (values) => {
        if(values.length) {
            let recentlyAddedTag = values[values.length - 1] 
            if(isValidUtmTag(recentlyAddedTag)) {
               return true; 
            } else {
                toast.error(`Invalid tag`)
                setBlacklist([...blacklist.splice(0, blacklist.length)]);
                return false; 
            }
        }
    }

    return (
      
        <TagInput 
            label="UTM Tag Value"
            values={utmTags}
            onChange={handleUtmTagsUpdate}
            leftIcon="flag"
            placeholder="TagValue"
            large={false}
            intent="primary"
            addOnPaste={true}
            addOnBlur={true}
            onAdd={validateRecentAddition}
            style={{ marginLeft: '15px', width: '100%' }}
        />
    )
}

function isValidUtmTag(utmTag) {
  if(utmTag.length) {
    return true; 
  }
  return false;
}

const CampaignTracker = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    
    const [category, setCategory] = useState(state.categories[0])
    const [key, setKey] = useState(state.keysByCategory[category])

    const handleAddition = (toAppend) => {
      dispatch({
          type: 'append',
          payload: {
              key: 'seoTags',
              value: `${category}:${key}=${toAppend}`
          }
      }); 
    }

    const handleDeletion = (index) => {
      dispatch({
          type: 'filter',
          payload: {
              key: 'seoTags',
              index
          }
      }); 
    }

    const handleKeyChange = (event) => {
      setKey(event.target.value)
    }

    const handleCategoryChange = (event) => {
      setCategory(event.target.value)
    }
   
    return (
        <div className="w-full flex-col justify-start align-stretch mr-3 m-1">
          <InputElementCardWrapper
              title="Campaign Tracking"
              description="Select a field for the type and name of tag, and enter the value you want to assign to it"
              children={
                <FormGroup
                    helperText="Select the appropriate options and type the corresponding value"
                    labelFor="utmTag"
                    labelInfo="(required)"
                    style={{ marginTop: '25px',marginLeft:'5px'}}
                >
                   <div style={{ width: '100%',  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: '5px', padding: '2.5px'}}> 
                    
                    
                      {/* <DropdownRadios 
                        label="Tag Name" 
                        icon={<Icon icon="key" intent="primary" />} 
                        items={[
                          { id: '1', title: 'name1' },
                          { id: '2', title: 'name2' },
                          { id: '3', title: 'name3' },
                        ]}
                      /> */}
                    
                      <div style={{ marginLeft: '15px', width: '100%'}}>
                        <TagValue handleAddition={handleAddition} />
                      </div>
                      
                    </div>
                  </FormGroup>
                }
          />
        </div>
    );
  }
  
   export default CampaignTracker
  