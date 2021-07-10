import React, { useState, useEffect, useContet } from "react"
import { GlobalStore } from '../store'

const XIconSvg = () => {
    return (
        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
    )
}

const Badge = ({ value }) => {

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
            {value}
            <button
                type="button"
                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
                <span className="sr-only">Remove large option</span>
                <XIconSvg />
            </button>
        </span>
    );
}

export default Badge