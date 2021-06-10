

const TextAreaForm = () => {
    
    return (
        <div className="min-w-0 flex-1">
            <form action="#">
                <div>
                    <label htmlFor="comment" className="sr-only">
                        About
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add a note"
                        defaultValue={''}
                    />
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <a
                        href="#"
                        className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                    >
                        <MarkdownIcon 
                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                        <span>
                            Markdown is accepted 
                        </span>
                    </a>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Commit
                    </button>
                </div>
            </form>
        </div>
    )
}

function TextAreaBlob() {

    return (
        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Notes
                    </h2>
                </div>
                
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <TextAreaForm /> 
                </div>
            </div>
        </div>
    );
}