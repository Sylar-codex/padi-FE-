import { useState, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageContext } from "../contexts/MessageContext";

const useWebSocketHook = () => {
  const [conversationName, setConversationName] = useState("");

  const { message, dispatchMessage } = useContext(MessageContext);

  const token = localStorage.getItem("authToken");

  const { readyState, sendJsonMessage } = useWebSocket(
    token ? `ws://127.0.0.1:8000/${conversationName}/` : null,
    {
      queryParams: {
        token: token,
      },
      onOpen: () => {
        console.log("Connected!");
      },
      onClose: () => {
        console.log("Disconnected!");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);

        dispatchMessage({ type: data.type, payload: data.message });
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return {
    connectionStatus,
    sendJsonMessage,
    message,
    setConversationName,
  };
};

export default useWebSocketHook;
