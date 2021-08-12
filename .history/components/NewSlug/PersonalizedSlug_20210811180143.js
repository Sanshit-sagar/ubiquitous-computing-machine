import React, { useState, useEffect, useContext } from 'react'
import Loader from '../Loader'

import { InputElementCardWrapper } from './index'; 
import { NewSlugStore } from '../../store'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Card } from '../../primitives/Card'

import { Button } from '../../primitives/Button'
import { TextField } from '../../primitives/TextField'
// TODO :: LEFT OFFF HERE, IMPORT AND COMPILE AND TEST OUTT THE NEW SLUG MODULES, REDO THE SEO/UTM ONE
import { Label, Fieldset } from '../../primitives/Label'

import useSWR from 'swr';
import toast from 'react-hot-toast'

const useNewSlug = () => {
    const { data, error } = useSWR('/api/slugs/new')
    
    return {
        slug: data ? data.slug : undefined,
        loading: !data && !error,
        error
    };
}

const useSlugValidation = (typedSlug) => {
    const { data, error } = useSWR(typedSlug?.length ? `/api/slugs/verify/${typedSlug}` : null)

    return {
        validity: data ? data.isValid : null,
        validityLoading: !data && !error,
        validityError: error,
    } 
}

const PersonalizedSlug = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [doFetch, setDoFetch] = useState(true);
    const [charsRem, setCharsRem] = useState(30);
    const [typedSlug, setTypedSlug] = useState('');
    const [randomSlug, setRandomSlug] = useState('');
    const [isAutogenerated, setIsAutogenerated] = useState(true)

    const handleRefresh = () => {
        setDoFetch(true); 
    }

    const handleInputChange = (event) => {
        if(charsRem===0) {
            toast.error('Slugs cannot be longer than 30 chars')
            return; 
        }
        setIsAutogenerated(false)
        setTypedSlug(event.target.value)
        setCharsRem(30 - typedSlug.length)
        mutate('slug', typedSlug);
        mutate('slugType', 'custom')
    }

    const handleAutogenChange = () => {
        setIsAutogenerated(!isAutogenerated)
    }

    const { slug, loading, error } = useNewSlug();
    const { validity, validityLoading, validityError } = useSlugValidation(typedSlug);

    useEffect(() => {
        if(!loading && !error && doFetch) {
            setRandomSlug(slug);
            mutate('slug', randomSlug);
            mutate('slugType', 'autogenerated')
            setDoFetch(false);
        }
    }, [typedSlug, slug, loading, error, doFetch]);

    useEffect(() => {
        if(error || validityError || (!typedSlug?.length && !randomSlug?.length)) return;

        let validationKey = 'slug'
        let isValidValue = false;

        let currentSlug = isAutogenerated ? randomSlug : typedSlug
        if(currentSlug.length) {
            isValidValue = currentSlug.length > 5 && currentSlug.length <= 30 && !validityError && !error;
        }

        dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch })
        mutate('slug', currentSlug);
    }, [loading, error, validityError, validityLoading, isAutogenerated, randomSlug, typedSlug])

    if(loading) return <Loader />
    if(error || validityError) return <p> Error: {error ? error.message : validityError.message} </p>

    return (
        <Box css={{ bc: '$loContrast', color: '$hiContrast', borderColor:'$hiContrast', borderRadius: '$1', borderWidth: '$1' }}>
            <InputElementCardWrapper
                title="Custom Slug"
                description='Select or type a new Slug for your URL'
                children={
                    <Box>
                        <Flex css={{ fd: 'row', jc:'flex-end', ai: 'flex-start' }}>
                            <Label> {isAutogenerated ? 'Auto-generated':'Custom' }</Label>
                            <Switch
                                name={'Slug Generation Mode'}
                                value={isAutogenerated ? 'auto' : 'custom'}  
                                checked={isAutogenerated}
                                onCheckedChange={handleAutogenChange}
                            />
                        </Flex>
                        <Box style={{  bc: '$loContrast', color: '$hiContrast', borderColor:'$hiContrast', width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'stretch', mt: '$4' }}>
                            <Flex style={{ width: '100%', marginLeft: '5px', backgroundColor: '$loContrast', color: '$hiContrast', borderColor:'$hiContrast'}}>
                                <Label> 
                                    <Text size='1'>Refresh for a new random slug </Text> 
                                </Label>
                                <TextField
                                    type="text"
                                    value={randomSlug}
                                    disabled={true} 
                                    rightElement={
                                        <Button 
                                            icon="refresh" 
                                            onClick={handleRefresh} 
                                            disabled={false}
                                            loading={loading} 
                                            intent={error ? "danger" : "success"} 
                                        >
                                            {loading ? <LoadingSpinner /> : tr}
                                        </Button>
                                    }
                                />
                            <Flex style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                {isAutogenerated ? <Text> Nice Choice! </Text>  : null}
                            </Flex>

                            </Flex>
                        </Box>

                        <Box style={{  bc: '$loContrast', color: '$hiContrast', borderColor:'$hiContrast', width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'stretch', mt: '$4' }}>
                            <Flex style={{ width: '100%', marginLeft: '5px', backgroundColor: '$loContrast', color: '$hiContrast', borderColor:'$hiContrast'}}>
                                <Label> 
                                <Text size="1"> 
                                    Enter the slug you'd like 
                                </Text>
                            </Label>
                            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center' }}>
                                <Button 
                                    loading={typedSlug?.length > 5 && validityLoading} 
                                    intent={validity ? 'success' : !validity ? 'danger' : 'none'} 
                                    icon={!validity ? 'error' : validity ? 'tick-circle' : ''}
                                /> 
                                
                                <TextField 
                                    type="text"
                                    value={typedSlug} 
                                    onChange={handleInputChange} 
                                />       
                            </Flex>
                            <Text> {`Chars: ${charsRem}/30`} </Text>
                        
                        </Flex>
                    </Box>
                            
                                
                    <Flex style={{  width: '100%', fd: 'row', jc: 'flex-end', ai: 'flex-end' }}>
                        {isAutogenerated ? null :
                            <Text css={{ color: validity ? 'green' : 'red' }}> 
                                {!validityLoading && !validityError 
                                    ? typedSlug.length <= 5 ? 'Too short! Slugs need to be longer than 5 chars' 
                                    : validity ? 'That ones available' : 'Hmmm, that doesnt look like a valid URL'
                                    : 'Enter a valid slug to check if its available'
                                }
                            </Text> 
                        }
                    </Flex>
                </Box>   
                } 
            />
        </Box>
    )
}

export default PersonalizedSlug