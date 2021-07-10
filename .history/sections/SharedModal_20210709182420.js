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
                
                <div className="min-h-screen px-4 text-center">
                    
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-30"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-30"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-30" />
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
                        <div className="inline-block p-6 my-8 text-left align-middle transition-all transform bg-white text-black dark:bg-black dark:text-white shadow-md rounded-md">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {state.modalData.title}
                            </Dialog.Title>

                            <Dialog.Description>
                                This will permanently deactivate your account
                            </Dialog.Description>

                            {state.modalData.content}

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
