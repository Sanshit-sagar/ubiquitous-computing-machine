import React, { useState } from 'react'
import toast from 'react-hot-toast';
import useSWR, { mutate } from 'swr'
import { fetcher } from '../../lib/utils'


const SubscriptionCard = () => {
    const [isEmailLoading, setEmailLoading] = useState(false)
    const [subscribeInput, setSubscribeInput] = useState('')
    const [numSubscribers, setNumSubscribers] = useState()

    const handleChange = (event) => {
        setSubscribeInput(event.currentTarget.value)
    }

    const handleSubmit = () => {
        subscribe()
    }

    const subscribe = async (e) => {
        setNumSubscribers(numSubscribers + 1)
        setEmailLoading(true)
    
        const res = await fetch('/api/subscriptions/create', {
          body: JSON.stringify({
            email: subscribeInput,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
    
        const { didSubscribe, error } = await res.json()
        setEmailLoading(false)
    
        if (error) {
            return toast.error('oh no! something went wrong, try again?')
        }
        
        mutate('/api/subscriptions/count')
        if(didSubscribe) {
            toast.success('you are now subscribed!')
        } else {
            toast.error('you were already subscribed')
        }
        setSubscribeInput('')
    }

    const NumSubscriptions = () => {
        const { data, error } = useSWR('/api/subscriptions/count', fetcher)

        if(!data && !error) return <p> loading... </p>
        if(error) return <p> error! </p>
        
        return (
            <Text> 
                {data?.numSubscribers} subscribers 
            </Text>
        )
    }

    return (
        <Box> {css={{ p: '$1', border: 'thin solid black'>
            <Flex css={{ fd: 'row', jc: 'space-betweem',}}>
                <Heading size='$'>
                    Subscribe  <NumSubscriptions /> 
                </Heading>

                <Box css={{ p: '$1', m: '$1',  border: 'thin solid black' }}>
                    <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'flex-start' }}>
                        <Text> Get updates as new features are released </Text>

                        <Box css={{ p: '$1' ,  border: 'thin solid black' }}>
                            <Flex>
                                <Label>
                                    Your Email
                                </Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={subscribeInput}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />
                            </Flex>
                        </Box>
                    
                        <Button
                            onClick={() => {
                                setNumSubscribers(numSubscribers + 1)
                                handleSubmit()
                            }}
                        >
                            { loading ? 'Loading' : <Loader /> }
                        </Button> 
                    </Flex>
                </Box>
            </Flex>
    )
}

export default SubscriptionCard