import React from 'react'
import {useSession} from 'next-auth/client'

const ActionsMenu = () => {
    const [session, loading] = useSession();


    const handleCancel = () => {
        alert('cancelling...')
    }

    const handleSave = () => {
        alert('saving...')
    }

    return (
        <div className="p-2 mr-2 bg-black text-white border-2 border-white flex justify-end">
            <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCancel}
                disabled={!session || !session?.user}
            >
                Cancel
            </button>

            <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
                disabled={!session || !session?.user}
            >
               Save
            </button>
        </div>
    )
}

export default ActionsMenu