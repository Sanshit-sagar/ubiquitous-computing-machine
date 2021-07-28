import React, { useState } from 'react'
import { useSession } from 'next-auth/client'
// import useSWR from 'swr'
// import axios from 'axios'

// import Loader from '@/components/Loader'
import StackedLayout from '@/sections/StackedLayout'
// import Badge from '../../buildingBlocks/Badge';
// import InfoModal, { DangerModal } from '../../buildingBlocks/Modal'

// import { NewSlugStore } from '../../store'
// import { getLocaleTimestring, getDateString } from '../../lib/datetime'

import SortedStatModal from '../../components/SortedStatModal'
import toast from 'react-hot-toast';
// import { Button, IconTrash, IconEye } from '@supabase/ui'

// const sanitize = (text, len) => {
//     return text && text.length ? text.substring(0, len) : ''
// }
 
// const LinkEntry = ({ email, index, cellsInRow, deleteConfirmed, setDeleteConfirmed, toggle, toggleInfoModal }) => {
//     const [deleteLoading, setDeleteLoading] = useState(false);

//     useEffect(() => {
//         if(deleteConfirmed && !deleteLoading) {
//             setDeleteConfirmed(false);
//             handleDeleteConfirmation();
//         } 
//     }, [deleteConfirmed])

//     const dispatch = useContext(NewSlugStore.Dispatch)
//     const cells = JSON.parse(cellsInRow)

//     let creationTimestamp = parseInt(cells.timestamp)
//     let expiryTimestamp = cells.config ? (parseInt(cells.config.ttl) || '') : ''
//     let currentTimestamp = new Date().getTime()
    
//     let lifespan = expiryTimestamp - creationTimestamp
//     let lifeLeft = expiryTimestamp - currentTimestamp
    
//     let validity = lifeLeft > 0 ? 'Active' : 'Expired'
//     let lifeLivedPercent = (validity==='Active' && lifespan) ? lifeLeft/lifespan : 0

//     const cellValues = [
//         [sanitize(cells.slug, 25), sanitize(cells.url, 30)], 
//         [getLocaleTimestring(creationTimestamp), getDateString(creationTimestamp)],
//         [getLocaleTimestring(expiryTimestamp), getDateString(expiryTimestamp)],
//         [<Badge value={validity} />, ''],
//         [`${lifeLivedPercent}`, '']
//     ];

//     const handleDeleteConfirmation = async () => {
//         setDeleteLoading(true);

//         dispatch({
//             type: 'filter',
//             payload: {
//                 key: 'links',
//                 value: index
//             }
//         }); 

//         toast.success(`Deleted slug: ${cells.slug} at index: ${index}`)

//         axios.delete(`/api/slugs/aliases/${email}?slug=${cells.slug}`).then((response) => {
//             console.log(`Confirmation of deletion: ${JSON.stringify(response)}`);
//         }).catch((error) => {
//             toast.error(`Error: ${error.message}`);
//         });

//         setDeleteLoading(false);
//     }

//     const handleDelete = () => {
//         //open delete confirmation modal, handle delete confirm is called from use effect 
//         if(!deleteConfirmed && !deleteLoading) {
//             toggle()
//         }
//     }

//     const handleOpen = () => {
//         toggleInfoModal(cells)
//     }

//     return (
//         <div>
//             <div className="w-full inline-flex justify-end align-center">
//                 <Button 
//                     type="outline" 
//                     size="small" 
//                     icon={<IconTrash />} 
//                     onClick={handleDelete}
//                     loading={deleteLoading}
//                     className="mr-2" 
//                 />
//                 <Button 
//                     type="primary" 
//                     size="small" 
//                     icon={<IconEye />} 
//                     onClick={handleOpen} 
//                 />
//             </div>
//         </div>
//     );
// }

export default function LinksPage({ meta }) {
    const [session] = useSession()
    const email  = session.user.email

    const [modalVisible, setModalVisible] = useState(false)
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [infoModalDetails, setInfoModalDetails] = useState(null)
    const [deleteConfirmed, setDeleteConfirmed] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const toggleInfoModal = (details) => {
        setInfoModalVisible(!infoModalVisible)
        setInfoModalDetails(details)
    }
    
    return (
        <StackedLayout 
            pageMeta={meta} 
            children={
                <div className="mt-2">
                    <SortedStatModal 
                        filter="allLinks" 
                        email={email} 
                    />
                </div>
            }
        />
    );
}

LinksPage.auth = true

LinksPage.defaultProps = {
    meta: { 
        title: 'Links', 
        description: 'All your saved slugs' 
    }
}
  
  