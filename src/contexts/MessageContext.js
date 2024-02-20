import { createContext, useReducer } from "react";
import messageReducer from "../reducers/messageReducer";

const MessageContext = createContext(null);

const { Provider } = MessageContext;

const initialState = {
  messages: [],
  onlineUsers: [],
  hasMoreMessages: false,
  typingEvent: null,
};

const MessageProvider = ({ children }) => {
  const [messages, dispatchMessages] = useReducer(messageReducer, initialState);
  return <Provider value={{ messages, dispatchMessages }}>{children}</Provider>;
};

export { MessageContext, MessageProvider };
