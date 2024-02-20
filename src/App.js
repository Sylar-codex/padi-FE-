import "./App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Chat from "./chat/Chat";
import useAuthState from "./hooks/authHook";
import PrivateRoutes from "./common/PrivateRoutes";
import HomeRedirect from "./layouts/HomeRedirect";

function App() {
  const { loadUser, auth, loadUserProfile } = useAuthState();
  useEffect(() => {
    loadUser();
    loadUserProfile();
    console.log(auth.isAuthenticated);
  }, [auth.isAuthenticated]);
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
