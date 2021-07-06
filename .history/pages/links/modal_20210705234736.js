import React, {useContext} from 'react'

import useSWR from 'swr'
import Loader from '../../components/Loader'
import {GlobalStore} from '../../store'

const fetcher = url => axios.get(url).then(res => res.data);

import { 
    Backdrop,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button,
    Badge
} from '@windmill/react-ui'

const useSlugDetails = () => {
    const state = useContext(GlobalStore.State)

    const {data, error} = useSWR(state.showSlugDetails && state.activeSlug.slug ? `/api/slugs/${state.activeSlug.slug}` : null, fetcher);

    return {
        details: data ? data.details : null, 
        loading: !data && !error,
        error: error
    }; 
}

const SlugDetailsModal = () => {

    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    let slug = state.showSlugDetails ? state.activeSlug.slug : ''
    const {data, error} = useSWR(state.showSlugDetails  ? `/api/slugs/views/${slug}` : null, fetcher)

    const closeModal = () => {
        dispatch({
            type: 'toggle_slug_modal',
            payload: {
                slug: ''
            }
        });
    }

    const { details, loading, error } = useSlugDetails()

    return (
        <div className="relative">

            <Modal isOpen={state.showSlugDetails} onClose={closeModal}>
                <ModalHeader>
                    {state.activeSlug.slug}
                </ModalHeader>
            
                <ModalBody>
                    {
                        (state.showSlugDetails && loading) ? <Loader /> 
                        : error ?  <p> Error! </p> 
                        : 
                            <>
                                <p className="text-sm"> 
                                    {JSON.stringify(details)}
                                </p>
                                <Badge type="success"> 
                                    {data ? data.views + ' views' : <Loader /> }
                                </Badge> 
                            </>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                        DONE
                    </Button>
                </ModalFooter>
            </Modal>

            { state.showSlugDetails && <Backdrop onClick={closeModal} /> }

        </div>
    )
}

export default SlugDetailsModal