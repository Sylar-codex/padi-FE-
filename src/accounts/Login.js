import React from "react";
import { Routes, Route } from "react-router-dom";
import UsernameInput from "../components/Auth/UsernameInput";
import PasswordInput from "../components/Auth/PasswordInput";

function Login() {
  return (
    <div className="m-auto w-1/2 pt-72 pb-44 relative">
      <h2 className="w-1/2 my-6 mx-auto text-xl font-bold">Sign In</h2>
      <Routes>
        <Route path="/username" element={<UsernameInput />} />
        <Route path="/password" element={<PasswordInput />} />
      </Routes>
    </div>
  );
}

export default Login;
