import { createContext, useReducer } from "react";

const NotificationContext = createContext(null);

const { Provider } = NotificationContext;

const initialState = {};

const NotificationProvider = () => {
  const [notification, dispatchNotification] = useReducer(i);
  return <Provider></Provider>;
};
