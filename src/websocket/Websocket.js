import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Websocket() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendJsonMessage } = useWebSocket("ws://127.0.0.1:8000/");

  const { readyState } = useWebSocket("ws://127.0.0.1:8000/", {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "chat_message_echo":
          setMessageHistory(...messageHistory, data);
          break;
        default:
          console.log("Unknown message type!");
          break;
      }
    },
  });

  function handleSubmit() {
    sendJsonMessage({
      type: "chat_message",
      message,
      username,
    });
    setUsername("");
    setMessage("");
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      {connectionStatus}
      <button
        className="bg-gray-30 px-3 py-1"
        onClick={() => {
          sendJsonMessage({
            type: "greeting",
            message: "Hi!",
          });
        }}
      >
        Say Hi
      </button>
      <input
        name="name"
        placeholder="Name"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        className="ml-2 shadow-sm sm:text-sm border border-gray-10 bg-gray-30 rounded-md"
      />
      <input
        name="message"
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        className="ml-2 shadow-sm sm:text-sm border border-gray-10 bg-gray-30 rounded-md"
      />
      <button
        className="ml-3 bg-active text-white px-3 py-1"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <hr />
      <ul>
        {messageHistory.map((message, ind) => (
          <div key={ind} className="border border-gray-20 py-3 px-3">
            {message.name}: {message.message}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Websocket;
