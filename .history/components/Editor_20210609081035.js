import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import ReactMarkdown from 'react-markdown';

import {
  EyeIcon,
  PencilIcon,
  CloudUploadIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { MarkdownIcon, MDComponents } from '@/components/index';

import InputWithLeadingItem from './TextInput' 
import { MailIcon } from '@heroicons/react/solid'

const tabs = [
  { text: 'Write', icon: PencilIcon },
  { text: 'Preview', icon: EyeIcon },
];

// function Example() {
//     return (
//       <div>
//         <div className="flex justify-between">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <span className="text-sm text-gray-500" id="email-optional">
//             Optional
//           </span>
//         </div>
//         <div className="mt-1">
//           <input
//             type="text"
//             name="email"
//             id="email"
//             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//             placeholder="you@example.com"
//             aria-describedby="email-optional"
//           />
//         </div>
//       </div>
//     )
//   }


const DestinationUrlInput = () => {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <InputWithLeadingItem
            id="destinationUrl"
            label="Destination URL"
            placeholder="www.thelinktoshorten.com"
            value={value}
            onChange={(event) => handleChange(event)}
            leadingElement={ <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> }
        />
    )
}

const Editor = ({
  initialData = null,
  showDeleteButton = true,
  showPublishButton = true,
  disabled = false,
  debouncedDelay = 500,
  onChange = () => null,
  onPublish = () => null,
  onDelete = () => null,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');

  // Debounced values - for auto save
  const [debouncedTitle] = useDebounce(title, debouncedDelay);
  const [debouncedContent] = useDebounce(content, debouncedDelay);

  // Use to keep track of initial render
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return
    }
    // Pass debounced values
    onChange(debouncedTitle, debouncedContent);
  }, [debouncedTitle, debouncedContent]);

  return (
   

    <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                    {/* <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Title...
                    </h2> */}
                    <ApartmentInDifferentBldg />
                </div>

            <div className="bg-gray-50 px-4 py-6 sm:px-6">

                <DestinationUrlInput /> 


                <div className="mt-6 flex justify-center sm:justify-between items-center space-x-2 px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 sticky top-0">
                    <div className="flex flex-row justify-end items-center space-x-6 sm:space-x-4">
                        {tabs.map(({ text, icon: Icon }, i) => (
                            <button
                                key={text}
                                onClick={() => setActiveTab(i)}
                                disabled={disabled}
                                className={`flex items-center space-x-1 transition-colors rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                                    activeTab === i
                                    ? 'text-blue-600 cursor-default select-none disabled:hover:text-blue-600'
                                    : 'hover:text-blue-600 disabled:hover:text-current'
                                }`}
                            >
                                <Icon className="w-6 h-6  flex-shrink-0" />
                                <span className="hidden sm:inline-block">
                                    {text}
                                </span>
                            </button>
                        ))}
                
                        {showPublishButton ? (
                            <button
                                onClick={() => onPublish(title, content)}
                                disabled={disabled}
                                className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
                            >
                                <CloudUploadIcon className="w-6 h-6 flex-shrink-0" />
                                <span className="hidden sm:inline-block">
                                    Publish
                                </span>
                            </button>
                        ) : null}

                        {showDeleteButton ? (
                            <button
                                onClick={onDelete}
                                disabled={disabled}
                                className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
                            >
                                <TrashIcon className="w-6 h-6 flex-shrink-0" />
                                <span className="hidden sm:inline-block">
                                    Delete
                                </span>
                            </button>
                        ) : null}
                    </div>  
                </div>
                    
                <article className="prose dark:prose-dark sm:prose-lg lg:prose-xl">
                    {activeTab === 0 ? (
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder='Tell your story'
                            disabled={disabled}
                            className='mt-4 w-full resize-none bg-transparent focus:outline-none text-xl leading-snug disabled:cursor-not-allowed'
                        />
                    ) : 
                        <>
                        {
                            content ? 
                            <ReactMarkdown components={MDComponents} children={content} /> :
                            <p> Nothing to preview yet... </p>
                        }
                        </>
                    }   
                </article>
            </div>
        </div>
    </div>
  );
};

export default Editor;