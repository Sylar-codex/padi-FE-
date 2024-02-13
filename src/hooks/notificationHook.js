import { useEffect, useState, useContext, useRef } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const useNotificationState = () => {
  const [isReady, setIsReady] = useState(false);

  const { notification, dispatchNotification } =
    useContext(NotificationContext);

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
      console.log("noti", data);
      // if (data.type === "unread_count") {
      //   console.log("unread", data);
      // }
      dispatchNotification({ type: data.type, payload: data });
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const current = ws.current;

  return { notification, current, isReady };
};

export default useNotificationState;
