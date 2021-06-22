

const websocket = (url) => {

    const messageList = <li> </li>;

    let resp = await fetch(url, {
        headers: { "Upgrade": "websocket" }
    });

    let ws = resp.webSocket;
    if (!ws) throw new Error("server didn't accept WebSocket"); 

    ws.accept();
    ws.send("hello");
    ws.addEventListener("message", msg => {
        console.log(msg.data);
    });

    return 
}