import React from "react"
 
// const XIconSvg = () => {
//     return (
//         <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
//             <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
//         </svg>
//     )
// }

const ClickIconSvg = () => {
    
    return (
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-800" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
        </svg>
    )
}

const DeleteableBadge = ({ value }) => {
    
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            {value}
            <button
                type="button"
                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
                <XIconSvg />
            </button>
        </span>
    );
}

export default DeleteableBadge