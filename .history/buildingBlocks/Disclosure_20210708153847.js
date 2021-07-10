import { ChevronUpIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const statusCodeDetails = [
  {
    code: 'HTTP 301',
    permanence: 'Permanent',
    cacheable: 'yes',
    methods: 'GET/POST can change',
    description: 'redirects permanently from one URL to another passing link equity to the redirected page'
  },
  {
    code: 'HTTP 302',
    permanence: 'Temporary',
    cacheable: 'not by default',
    methods: 'GET/POST can change',
    description: 'originally "temporary redirect" in HTTP/1.0 and popularly used for CGI scripts; superseded by 303 and 307 in HTTP/1.1 but preserved for backward compatibility'
  },
  {
    code: 'HTTP 303',
    permanence: 'Temporary',
    cacheable: 'never',
    methods: 'always GET',
    description: 'forces a GET request to the new URL even if original request was POST'
  },
  {
    code: 'HTTP 307',
    permanence: 'Temporary',
    cacheable: 'not by default',
    methods: 'may not change',
    description: 'provides a new URL for the browser to resubmit a GET or POST request'
  },
  {
    code: 'HTTP 308',
    permanence: 'Permanent',
    cacheable: 'yes, by default',
    methods: 'may not change',
    description: 'provides a new URL for the browser to resubmit a GET or POST request'
  },
]

const DisclosurePanels = () => {
  const [selected, setSelected] = useState(statusCodeDetails[0])

  return (
    <div className="w-full px-4 py-16">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="not-sr-only">
                Redirect HTTP Status Code
            </RadioGroup.Label>
            
            <div className="space-y-2">
                {statusCodeDetails.map(function(statusCode, index) {
                    <RadioGroup.Option
                        key={index}
                        value={statusCode}
                        className={({ active, checked }) =>
                        `${
                            active
                            ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                            : ''
                        }
                        ${
                            checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                        }
                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex`
                        }
                    >
                    {({ active, checked }) => (
                        <>
                            <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                      }`}
                                  >
                                      {statusCode.code}
                                  </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                    }`}
                                >
                                    <span>
                                    {statusCode.permanence} | Cacheable: {statusCode.cacheable}
                                    </span>{' '}
                                    <span aria-hidden="true">&middot;</span>{' '}
                                    <span>{statusCode.description}</span>
                                </RadioGroup.Description>
                                </div>
                            </div>
                            {checked && (
                                <div className="flex-shrink-0 text-white">
                                <CheckIcon className="w-6 h-6" />
                                </div>
                            )}
                            </div>
                        </>
                    )}
                </RadioGroup.Option>
                })}
            </div>
        </RadioGroup>
      </div>
    </div>
  )
}

const CheckIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DisclosurePanels
