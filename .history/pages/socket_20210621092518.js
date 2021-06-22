// import React from 'react'

// const websocket = async (url) => {

//     const messageList = [];

//     let resp = await fetch('https://calm-sea-6740.hashably.workers.dev', {
//         headers: { "Upgrade": "websocket" }
//     });

//     let ws = resp.webSocket;
//     if (!ws) return <p> ewww </p>

//     ws.accept();
//     ws.send("hello");
//     ws.addEventListener("message", msg => {
//         console.log(msg.data);
//         messageList.push(msg.data);
//     });

//     return (
//         <div>
//             {messageList.map((message, index) => {
//                 return (
//                     <li key={index}>
//                         return (
//                             <ul> Message: {message} </ul>
//                         );
//                     </li>
//                 ); 
//             })}
//         </div>
//     )
// }

// export default websocket