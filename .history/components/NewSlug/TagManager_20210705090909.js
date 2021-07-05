import React, {useState} from 'react';

import { InputElementCardWrapper } from './index'

import { IconActivity, Select, Card, Input, Button, Badge, Typography } from '@supabase/ui'

const TagsList = ({ tagsList, handleDeletion }) => {

    const { Title, Text } = Typography; 

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
                {!tagsList.length 
                    ?   <Text> Add tags below to start seeing them here </Text> 
                    :  <> <Title level={4}> SEO/UTM tags </Title> <br /> </>
                }
                <li className="inline-flex justify-start align-start flex-wrap max-w-full">
                    {tagsList.map(function(value, index) {
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
            </Card>
        </div>
    )
}

const categoryKeyMap = {
  'category1': ['key1', 'key2', 'key3'],
  'cateogry2': ['key4', 'key5', 'key6'],
  'category3': ['key7', 'key8', 'key9'],
}; 


const TagCategory = ({ category, handleCategoryChange }) => {

  return (
    <div className="mt-2">
      <Select
        label="Select Tag Category"
        onChange={handleCategoryChange}
        icon={<IconActivity />}
      >
        {Object.entries(categoryKeyMap).map(function(value, index) {
          return (
            <Select.Option 
              key={index}
              value={Object.entries(categoryKeyMap)[index][0]}
            > 
            {Object.entries(categoryKeyMap)[index][0]}
            </Select.Option> 
          ); 
        })}
      </Select>
    </div>
  );
}



const TagKey = ({ category, currentKey, handleKeyChange }) => {

  return (
    <>
      <p> {currentKey} </p>
      <Select
        label="Select Tag Key"
        onChange={handleKeyChange}
        icon={<IconActivity />}
      >
        {categoryKeyMap[category].map(function(value, keyIndex) {
          return (
            <Select.Option 
              key={keyIndex}
              value={categoryKeyMap[category][keyIndex]}
            > 
              {categoryKeyMap[category][keyIndex]}
            </Select.Option> 
          ); 
        })}
      </Select>
    </> 
  );
}

const TagValue = ({ handleAddition }) => {
    const [currentValue, setCurrentValue] = useState('')

    const handleUpdate = (event) => {
      setCurrentValue(event.target.value)
    }

    const clearInput = () => {
      setCurrentValue('')
    }

    return (
        <Input 
            label="Tag Value"
            value={currentValue}
            onChange={handleUpdate}
            actions={[
                <Button 
                    onClick={() => {
                        handleAddition(currentValue)
                        clearInput()
                    }}
                    success
                >
                    Add tag
                </Button>,
            ]}
        />
    )
}

const TagManager = () => {
    const [tagsList, setTagsList] = useState([])
    const [category, setCategory] = useState(Object.entries(categoryKeyMap)[0][0])
    const [currentKey, setCurrentKey] = useState(Object.entries(categoryKeyMap)[0][1][0])

    const handleKeyChange = (event) => {
      setCurrentKey(event.target.value)
    }

    const handleCategoryChange = (event) => {
      setCategory(event.target.value)
    }

    const handleAddition = (elemToAdd) => {
      setTagsList([...tagsList, `${category}:${currentKey}=${elemToAdd}`]);
    }

    const handleDeletion = (index) => {
      setTagsList(tagsList.filter(function(e, i) {
            return i!==index; 
      })); 
    }

    return (
        <div className="w-full flex-col justify-start align-stretch">
          <InputElementCardWrapper
              title="SEO/UTM tags"
              description="Select a field for the type and name of tag, and enter the value you want to assign to it"
              children={
                <>
                  <TagsList 
                      tagsList={tagsList} 
                      handleDeletion={handleDeletion} 
                  /> 

                  <TagCategory
                    category={category}
                    handleCategoryChange={handleCategoryChange}
                  />
                  <TagKey
                      currentKey={currentKey}
                      handleKeyChange={handleKeyChange}
                  />
                  <TagValue 
                      handleAddition={handleAddition} 
                  />

                </>
              }
          />
        </div>
    );
  }
  
   export default TagManager
  