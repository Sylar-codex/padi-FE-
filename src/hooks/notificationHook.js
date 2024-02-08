import { useEffect, useState, useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const useNotificationState = () => {
  const [isReady, setIsReady] = useState(false);

  const { notification, dispatchNotification } =
    useContext(NotificationContext);

  const token = localStorage.getItem("authToken");

  const url = token ? `ws://127.0.0.1:8000/notification/?token=${token}` : null;

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
  }, [conversationName]);

  const current = ws.current;

  return { notification, current, isReady };
};

export default useNotificationState;
