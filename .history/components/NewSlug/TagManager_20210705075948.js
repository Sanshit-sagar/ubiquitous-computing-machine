import React, {useState} from 'react';

// import { GlobalStore } from '../../store'
import { Card, Input, Button, Badge, Typography } from '@supabase/ui'

const BlacklistedIpList = ({ tagsList, handleDeletion }) => {

    const { Title, Text } = Typography; 

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
                {!blacklist.length 
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

const IpAddressInput = ({ handleBlacklistAddition }) => {
    const [currentIp, setCurrentIp] = useState('')

    const handleIpUpdate = (event) => {
        setCurrentIp(event.target.value)
    }

    const clearIpInput = () => {
        setCurrentIp('')
    }

    return (
        <Input 
            label="IP Address"
            value={currentIp}
            onChange={handleIpUpdate}
            actions={[
                <Button 
                    onClick={() => {
                        handleBlacklistAddition(currentIp)
                        clearIpInput()
                    }}
                    success
                >
                    Add to Blacklist
                </Button>,
            ]}
        />

    )
}



const TagManager = () => {
    const [tagsList, setTagsList] = useState([])

    const handleAddition = (elemToDelete) => {
      setTagsList([...tagsList, elemToDelete]);
    }

    const handleDeletion = (index) => {
      setTagsList(tagsList.filter(function(e, i) {
            return i!==index; 
        })); 
    }

    return (
        <>
            <TagsList 
                tagsList={tagsList} 
                handleDeletion={handleDeletion} 
            /> 
            <TagValueInput 
                handleAddition={handleAddition} 
            />
        </>
    );
  }
  
   export default TagManager
   
  