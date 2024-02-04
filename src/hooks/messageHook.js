import { useState, useContext, useEffect, useRef } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { handleApiCall } from "../services/httpConfig";
import useWebSocketHook from "./websocketHook";
import { load_more_messages } from "../actions/type";

const useMessageState = () => {
  const { messages, dispatchMessages } = useContext(MessageContext);
  const { conversationName } = useWebSocketHook();
  const [page, setPage] = useState(2);

  const converse = "admin001__sylarvi";

  const getMessages = async () => {
    try {
      const response = await handleApiCall(
        `api/messages/?conversation=${converse}&page=${page}`,
        "GET"
      );
      console.log(response.data);
      dispatchMessages({ type: load_more_messages, payload: response.data });
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getMessages,
  };
};

export default useMessageState;
