import "./App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Chat from "./chat/Chat";
import DisplayChat from "./chat/DisplayChat";
import useAuthState from "./hooks/authHook";

function App() {
  const { loadUser, auth } = useAuthState();
  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/message" element={<DisplayChat />} />
      </Routes>
    </Fragment>
  );
}

export default App;
