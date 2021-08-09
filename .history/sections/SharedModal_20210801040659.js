// import React, { useState, useContext } from 'react'
// import { Dialog, AnchorButton, Classes, Intent } from '@blueprintjs/core'
// import { NewSlugStore, GlobalStore } from '../store'

// const SharedModal = () => {
//     const uiState = useState(GlobalStore.State)
//     const state = useContext(NewSlugStore.State)
//     const dispatch = useContext(NewSlugStore.Dispatch)

//     const handleCloseModal = () => {
//         dispatch({
//             type: 'closeModal'
//         }); 
//     }

//     return (
//         <Dialog 
//             isOpen={state.modalOpen} 
//             onClose={handleCloseModal}
//             canOutsideClickClose={true}
//             canEscapeKeyClose={true}
//             autoFocus={true}
//             usePortal={true}
//             title={state.modalData.title}
//             icon="feed"
//             className={uiState.darkMode ? 'bp3-dark' : ''}
//             lazy={true}
//             style={{ width: '1325px', height: '800px', overflowY: 'scroll' }}
//         >
//             <div className={Classes.DIALOG_BODY}>
//                 <p> {state.modalData.description || null} </p>
//                 {state.modalData.content}
//             </div>
//             <div className={Classes.DIALOG_FOOTER}>
//                 <div className={Classes.DIALOG_FOOTER_ACTIONS}>
//                     <AnchorButton
//                         intent={Intent.PRIMARY}
//                         onClick={handleCloseModal}
//                     >
//                         Done
//                     </AnchorButton>
//                 </div>
//             </div>
//         </Dialog>
//     )
// }

// export default SharedModal
