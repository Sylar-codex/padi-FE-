import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UsernameInput from "../components/Auth/UsernameInput";
import PasswordInput from "../components/Auth/PasswordInput";

function Login() {
  return (
    <div className="m-auto w-1/2 pt-72 pb-44 relative">
      <h2 className="w-1/2 my-4 mx-auto text-xl font-bold">Sign In</h2>
      <p className="text-gray-70 w-1/2 my-2 mx-auto">
        Not a member yet?{" "}
        <Link className="text-active" to="/signup">
          Sign Up
        </Link>
      </p>
      <Routes>
        <Route path="/username" element={<UsernameInput />} />
        <Route path="/password/:username" element={<PasswordInput />} />
      </Routes>
    </div>
  );
}

export default Login;
