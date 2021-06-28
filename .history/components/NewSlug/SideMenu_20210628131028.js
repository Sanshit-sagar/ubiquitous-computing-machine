import React, { useContext } from 'react'
import { GlobalStore } from '../../store'
import { IconClipboard, IconCopy, IconTrash, Menu } from "@supabase/ui";

export default function NewSlugNavMenu() {
    return (
      <Menu>
        <Menu.Group title="Billing" />
        <Menu.Item active icon={<IconClipboard />}>
          Copy
        </Menu.Item>
        <Menu.Item icon={<IconCopy />}>Duplicate</Menu.Item>
        <Menu.Item icon={<IconTrash stroke="red" />}>Delete</Menu.Item>
        <Menu.Group title="Support" />
        <Menu.Item icon={<IconClipboard />}>Copy</Menu.Item>
        <Menu.Item active showActiveBar icon={<IconCopy />}>
          Duplicate
        </Menu.Item>
        <Menu.Item icon={<IconTrash stroke="red" />}>Delete</Menu.Item>
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

const SidemenuWrapper = () => {

    return (
        <div className="flex-col justify-start align-start m-2 p-2 mr-5">

            <NewSlugNavMenu />
        </div>  
    )
}

export default SideMenuWrapper