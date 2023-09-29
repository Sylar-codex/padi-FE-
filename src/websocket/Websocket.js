import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Websocket() {
  const { sendJsonMessage } = useWebSocket("ws://127.0.0.1:8000/");

  const { readyState } = useWebSocket("ws://127.0.0.1:8000/", {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    onMessage: (e) => {
      console.log(e);
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  // useEffect(() => {
  //   // websocket instance
  //   const socket = new Websocket("ws://localhost:8000");

  //   //websocket event listeners

  //   socket.onopen = () => {
  //     console.log("websocket connect is open");
  //   };

  //   socket.onmessage = (e) => {
  //     console.log("Received message from server:", e.data);
  //     // Process the received message here
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };

  //   socket.error = (e) => {
  //     console.log(e.message);
  //   };

  //   // Clean up the WebSocket connection when the component unmounts
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <div>
      {connectionStatus}
      <button
        className="bg-gray-300 px-3 py-1"
        onClick={() => {
          sendJsonMessage({
            type: "greeting",
            message: "Hi!",
          });
        }}
      >
        Say Hi
      </button>
    </div>
  );
}

export default Websocket;
