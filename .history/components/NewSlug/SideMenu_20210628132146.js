import React, { useContext } from 'react'
import { GlobalStore } from '../../store'
import { IconClipboard, IconCopy, IconTrash, Menu } from "@supabase/ui";

function NewSlugNavMenu() {
    const items = [
        { id: 'basics', title: 'Basic Details', icon: '' },
        { id: 'ttl', title: 'Expiration (TTL)', icon: '' },
        { id: 'password', title: 'Encryptions', icon: '' },
        { id: 'ipBlacklists', title: 'blacklists', icon: '' },
        { id: 'redirects', title: 'Redirect Rules', icon: '' },
        { id: 'seo', title: 'seo', icon: '' },
        { id: 'discard', title: 'discard', icon: <IconTrash stroke="red" /> },
    ]

    return (
        <Menu>
            {items.map(function(item, index) {
                return (
                    <div key={index}>
                        <Menu.Item
                            title={item.title}
                            icon={<item.icon stroke={icon.color} />}
                        /> 
                    </div>
                )
            })}
        </Menu>
    );
  }
  

// function ExpirationSelector({ isOptional, title, instruction, outputMessage, isSuccessful, content }) {
//     const state = useContext(GlobalStore.State)
//     const dispatch = useContext(GlobalStore.Dispatch)

//     return (
//         <div className=" w-full flex-col justify-start align-start p-5 m-3 pr-5 border border-black rounded-md bg-white text-gray-700 font-extralight">
//             <div className="flex justify-between">
//                 <label htmlFor="email" className="block text-sm font-extralight text-gray-600">
//                     {title}
//                 </label>
//                 <span className="text-sm font-extralight text-gray-600" id="email-optional">
//                     {isOptional ? 'optional' : ''}
//                 </span>
//             </div>

//             <label> 
//                 <span className="text-xs mb-5 mt-3"> 
//                     {instruction} 
//                 </span>
//             </label>

//             <div className="w-full  mt-5 mb-2 font-extralight text-gray-600">
//                 {content ? content : 
                    
//                 }
//             </div>

//             <label> 
//                 <span className="text-xs mt-5 text-green"> 
//                     {outputMessage}
//                 </span>    
//             </label>
//         </div>
//     )
// }

const SideMenu = () => {

    return (
        <div className="flex-col justify-start align-start m-2 p-2 mr-5">

            <NewSlugNavMenu />
        </div>  
    )
}

export default SideMenu