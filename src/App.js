import "./App.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Chat from "./chat/Chat";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Fragment>
  );
}

export default App;
