import React, { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { NewSlugStore } from '../store'

const SharedModal = () => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleCloseModal = () => {
        dispatch({
            type: 'closeModal'
        }); 
    }

    

    return (
        <Transition appear show={state.modalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={handleCloseModal}
            >
                
                <div className="h-screen px-4 text-center">
                    
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-30"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-30"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block p-6 my-8 text-left align-middle transition-all transform bg-white text-black dark:bg-gray-700 dark:text-white shadow-md rounded-md">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                <span className="text-md font-extralight text-black dark:text-white">
                                    {state.modalData.title}
                                </span>
                            </Dialog.Title>

                            <Dialog.Description>
                               <span className="text-sm font-extralight">
                                   {state.modalData.description || "description here: TODO"}
                                </span>
                            </Dialog.Description>

                            <div className="m-2 p-2 rounded-sm shadow-md">
                                {state.modalData.content}
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-extralight text-blue-900 bg-green-400 border border-black dark:border-white rounded-md hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500"
                                    onClick={handleCloseModal}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SharedModal
