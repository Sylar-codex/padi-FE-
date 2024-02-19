import { useEffect, useState, useContext, useRef } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import { GET_ACTIVE_CONVERSATIONS } from "../actions/type";
import { handleApiCall } from "../services/httpConfig";

const useNotificationState = () => {
  const [isReady, setIsReady] = useState(false);

  const { notification, dispatchNotification } =
    useContext(NotificationContext);

  const loadActiveConversations = async () => {
    try {
      const response = await handleApiCall("api/conversations", "GET");
      dispatchNotification({
        type: GET_ACTIVE_CONVERSATIONS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const token = localStorage.getItem("authToken");

  const ws = useRef(null);

  const url = token
    ? `ws://127.0.0.1:8000/notifications/?token=${token}`
    : null;

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      dispatchNotification({ type: data.type, payload: data });
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const current = ws.current;

  return { notification, current, isReady, loadActiveConversations };
};

export default useNotificationState;
