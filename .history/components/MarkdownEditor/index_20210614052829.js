import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr'
import fetcher from '../../lib/utils'

// import Header from './Header'
// import InputWithLeadingItem from '../TextInput' 
// import { MailIcon } from '@heroicons/react/solid'
// import SlugSeletor from '../SlugSelector'

import {
  EyeIcon,
  PencilIcon,
  CloudUploadIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { MarkdownIcon, MDComponents } from '@/components/index';
// import fetcher from '../../lib/utils'
import {useRouter} from 'next/router'
// import PageViewStats from '../Stats/index'
import InputForm from './InputForm'

const tabs = [
  { text: 'Write', icon: PencilIcon },
  { text: 'Preview', icon: EyeIcon },
];

// const PageViewStats = ({ currentHash }) => {
//     const {views, error} = useSWR(id ? `/api/hash/info/${id}` : null, fetcher)

//     if(!views && !error) return <p> loading... </p>
//     if(error) return <p> error... </p> 

//     return (
//         <div>
//             <h3> Views: {views ? JSON.stringify(views) : '0'} </h3>
//             <subtitle> #{id} </subtitle>
//         </div>    
//     )
// }
const PageViews = ({ initialData }) => {
    if(!initialData || !initialData.id) return null

    const slug = initialData.id
    const { data, error } = useSWR(`/api/hash/info/${slug}`, fetcher)

    if(!data && !error) return <h1> loading... </h1>
    if(error) return <h1> error </h1> 
    
    return (
        <>
            <h1> {`ID: ${initialData.id}`} </h1> 
            <h1> {JSON.stringify(data)} </h1> 
        </>
    );
}


const Editor = ({
    initialData = null,
    showDeleteButton = false,
    showPublishButton = false,
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
    const router = useRouter();

    useEffect(() => {
        // Don't run on initial render
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        // Pass debounced values
        onChange(debouncedTitle, debouncedContent);
    }, [debouncedTitle, debouncedContent]);


    return (
        <div className="w-full max-w-screen-lg mx-auto">
            {/* <PageViews initialData={initialData} />  */}

            <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength="150"
                placeholder="Title…"
                disabled={disabled}
                className="w-full text-3xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed"
            />
            <InputForm /> 
            
            {/* Action tabs */}
            {/* <div className="mt-6 flex justify-center sm:justify-between items-center space-x-2 px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 sticky top-0">
                <div className="flex flex-row justify-center items-center space-x-6 sm:space-x-4">
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
                    <span className="hidden sm:inline-block">{text}</span>
                    </button>
                ))}

                {showPublishButton ? (
                    <button
                    onClick={() => onPublish(title, content)}
                    disabled={disabled}
                    className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
                    >
                    <CloudUploadIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="hidden sm:inline-block">Publish</span>
                    </button>
                ) : null}

                {showDeleteButton ? (
                    <button
                    onClick={onDelete}
                    disabled={disabled}
                    className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
                    >
                    <TrashIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="hidden sm:inline-block">Delete</span>
                    </button>
                ) : null}
                </div>

                <a
                href="https://commonmark.org/help/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 hover:text-blue-600"
                >
                <MarkdownIcon className="w-6 h-6  flex-shrink-0" />
                <span className="hidden sm:inline-block">Mardown supported</span>
                </a>
            </div> */}

            {/* Blog post content */}
            {/* <div className="px-4 py-12">
                {activeTab === 0 ? (
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    disabled={disabled}
                    className="w-full min-h-screen resize-none bg-transparent focus:outline-none text-xl leading-snug disabled:cursor-not-allowed"
                />
                ) : (
                <article className="prose dark:prose-dark sm:prose-lg lg:prose-xl max-w-none min-h-screen">
                    {content ? (
                    <ReactMarkdown components={MDComponents} children={content} />
                    ) : (
                    <p>Nothing to preview yet...</p>
                    )}
                </article>
                )}
            </div> */}
        </div>
    )
}
export default Editor;