import "./App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Chat from "./chat/Chat";
import useAuthState from "./hooks/authHook";
import PrivateRoutes from "./common/PrivateRoutes";

function App() {
  const { loadUser, auth, loadUserProfile } = useAuthState();
  useEffect(() => {
    loadUser();
    loadUserProfile();
  }, [auth.isAuthenticated]);
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
