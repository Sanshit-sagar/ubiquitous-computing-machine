import React from 'react'

const websocket = async (url) => {

    const messageList = <li> <ul> hihi </ul> </li>;

    let resp = await fetch(url, {
        headers: { "Upgrade": "websocket" }
    });

    let ws = resp.webSocket;
    if (!ws) throw new Error("server didn't accept WebSocket"); 

    ws.accept();
    ws.send("hello");
    ws.addEventListener("message", msg => {
        console.log(msg.data);
        messageList.push({ msg.data });
    });

    return (
        <messageList />
    )
}

export default websocket