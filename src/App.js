import "./App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Chat from "./chat/Chat";
import useAuthState from "./hooks/authHook";
import Conversations from "./chat/Conversations";

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
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </Fragment>
  );
}

export default App;
