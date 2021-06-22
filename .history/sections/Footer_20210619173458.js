import React from 'react'
import toast from 'react-hot-toast';
import useSWR, {mutate} from 'swr'
import {fetcher} from '../lib/utils'

function SubscriptionCard() {
    const [isEmailLoading, setEmailLoading] = React.useState(false)
    const [subscribeInput, setSubscribeInput] = React.useState('')
    const [numSubscribers, setNumSubscribers] = React.useState()

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
        
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                <h5>  
                    {!data && !error ? '...' : data.numSubscribers} subscribers 
                </h5> 
            </span>
        )
    }

    return (
      <div className="bg-white shadow">
        <div className="px-2 py-2">
        
        <div className="w-full inline-flex flex-row justify-between items-center">
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900"> 
                    Subscribe  <NumSubscriptions /> 
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p> 
                        Get updates as new features are released 
                    </p>
                </div>
            </div>

            <div>
                <div className="sm:flex sm:items-center">
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="sr-only">
                            Your Email
                        </label>
                        <input
                            value={subscribeInput}
                            onChange={handleChange}
                            type="text"
                            name="email"
                            id="email"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="you@example.com"
                        />
                    </div>
                    <button
                        className="w-full inline-flex items-center justify-center border py-2 px-2 border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        loading={isEmailLoading}
                        onClick={() => {
                            setNumSubscribers(numSubscribers + 1)
                            handleSubmit()
                        }}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

        </div>
      </div>
    )
}

const Footer = () => (
    <footer className="px-3 py-3 bg-black">
        <SubscriptionCard /> 
    </footer>
);
  
export default Footer;