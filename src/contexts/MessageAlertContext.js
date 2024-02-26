import { createContext, useReducer } from "react";
import messageAlertReducer from "../reducers/messageAlertReducer";

const MessageAlertContext = createContext(null);

const { Provider } = MessageAlertContext;

const initialState = {
  messageAlert: {},
};

const MessageAlertProvider = ({ children }) => {
  const [messageAlert, dispatchMessageAlert] = useReducer(
    messageAlertReducer,
    initialState
  );
  return (
    <Provider value={{ messageAlert, dispatchMessageAlert }}>
      {children}
    </Provider>
  );
};

export { MessageAlertContext, MessageAlertProvider };
