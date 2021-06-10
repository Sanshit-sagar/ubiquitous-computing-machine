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

import InputWithLeadingItem from '../TextInput' 
import { MailIcon } from '@heroicons/react/solid'
import Header from './Header'
import SlugSeletor from '../SlugSelector'

const tabs = [
  { text: 'Write', icon: PencilIcon },
  { text: 'Preview', icon: EyeIcon },
];


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
                    <Header /> 
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:px-6">

                    <SlugSeletor /> 

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
                        </div>  
                    </div>
                        
                    <article className="prose dark:prose-dark sm:prose-lg lg:prose-xl">
                        {activeTab === 0 ? 
                                <textarea
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    placeholder='Tell your story'
                                    disabled={disabled}
                                    className='mt-4 w-full resize-none bg-transparent focus:outline-none text-xl leading-snug disabled:cursor-not-allowed'
                                />
                             : 
                                <> { content ? 
                                    <ReactMarkdown components={MDComponents} children={content} /> :
                                    <p> Nothing to preview yet... </p> } 
                                </>
                        }   
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Editor;