import { createContext, useReducer } from "react";
import notificationReducer from "../reducers/notificationReducer";

const NotificationContext = createContext(null);

const { Provider } = NotificationContext;

const initialState = {};

const NotificationProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    initialState
  );
  return (
    <Provider value={{ notification, dispatchNotification }}>
      {children}
    </Provider>
  );
};

export { NotificationContext, NotificationProvider };
