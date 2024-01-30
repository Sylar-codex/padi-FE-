import React from "react";
import useAuthState from "../hooks/authHook";
function TempChat({ message }) {
  const { auth } = useAuthState();
  const { user } = auth;
  return <div>{}</div>;
}

export default TempChat;
