import { useState, useContext, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageContext } from "../contexts/MessageContext";
import { AuthContext } from "../contexts/AuthContext";

const useWebSocketHook = () => {
  const [conversationName, setConversationName] = useState("");

  const { messages, dispatchMessages } = useContext(MessageContext);

  const [isReady, setIsReady] = useState(false);

  const ws = useRef(null);

  const token = localStorage.getItem("authToken");

  const url = token
    ? `ws://127.0.0.1:8000/${conversationName}/?token=${token}`
    : null;

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      dispatchMessages({ type: data.type, payload: data });
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [conversationName]);

  const current = ws.current;

  return { isReady, messages, setConversationName, conversationName, current };
};

export default useWebSocketHook;
