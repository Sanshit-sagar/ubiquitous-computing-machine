import React from 'react'
import Loader from '../Loader'

import { InputElementCardWrapper } from './index'; 
import { Input } from '@supabase/ui'
import useSWR from 'swr';

const PersonalizedSlug = () => {
    const { data, error } = useSWR('/api/slugs/new')

    if(!data && !error) return <Loader />
    if(error) return <p> Error: {error.message} </p>

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                description={'Select or enter a slug of your liking'}
                children={
                    <div className="mt-1">
                        <Input
                            value={data.slug}
                            type="text"
                            label="Slug"
                            descriptionText="Select the Slug you'd like your viewers to click" 
                        />
                    </div>
                }
            />
        </div>
    )
}

export default PersonalizedSlug