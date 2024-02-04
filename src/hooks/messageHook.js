import { useState, useContext, useEffect, useRef } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { AuthContext } from "../contexts/AuthContext";
import { handleApiCall } from "../services/httpConfig";
import { load_more_messages } from "../actions/type";

const useMessageState = () => {
  const [conversationName, setConversationName] = useState("");

  const { messages, dispatchMessages } = useContext(MessageContext);

  const [isReady, setIsReady] = useState(false);
  const [page, setPage] = useState(2);

  // fetch older messages
  const getMessages = async () => {
    try {
      const response = await handleApiCall(
        `api/messages/?conversation=${conversationName}&page=${page}`,
        "GET"
      );
      console.log(response.data);
      dispatchMessages({ type: load_more_messages, payload: response.data });
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

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

  return {
    isReady,
    messages,
    setConversationName,
    conversationName,
    getMessages,
    current,
  };
};

export default useMessageState;
