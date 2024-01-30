import { createContext, useReducer } from "react";
import messageReducer from "../reducers/messageReducer";

const MessageContext = createContext(null);

const { Provider } = MessageContext;

const initialState = {
  message: [],
};

const MessageProvider = ({ children }) => {
  const [message, dispatchMessage] = useReducer(messageReducer, initialState);
  return <Provider value={{ message, dispatchMessage }}>{children}</Provider>;
};

export { MessageContext, MessageProvider };
