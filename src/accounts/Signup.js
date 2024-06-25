import React, { useContext, useState } from "react";
import SignupAuth from "../components/Auth/SignupAuth";
import PasswordSet from "../components/Auth/PasswordSet";
import useInputState from "../hooks/inputHook";
import useAuthState from "../hooks/authHook";
import { Link, Navigate } from "react-router-dom";
import { MessageAlertContext } from "../contexts/MessageAlertContext";
import { createMessageAlert } from "../actions/messages";

function Signup() {
  const [steps, setSteps] = useState(0);

  const { dispatchMessageAlert } = useContext(MessageAlertContext);

  const { register, auth } = useAuthState();
  const [email, setEmail] = useInputState("");
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [passwordConfirm, setPasswordConfirm] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && passwordConfirm !== "") {
      if (password === passwordConfirm) {
        email.toLowerCase();
        const payload = { email: email.toLowerCase(), username, password };
        register(payload);
      } else {
        dispatchMessageAlert(
          createMessageAlert({ passwordNotMatch: "Password does not match" })
        );
      }
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return (
    <div className="m-auto lg:w-1/2 w-full pt-72 pb-44 relative">
      <h2 className="w-1/2 my-4 mx-auto text-xl font-semibold">
        {steps === 0 ? "Sign Up" : "Provide Your Password"}
      </h2>
      <p className="text-gray-70 w-1/2 my-2 mx-auto">
        Already a member?{" "}
        <Link className="text-active" to="/login/username">
          Sign In
        </Link>
      </p>
      {steps === 0 ? (
        <SignupAuth
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          setSteps={setSteps}
        />
      ) : (
        <PasswordSet
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          setSteps={setSteps}
          handleSubmit={handleSubmit}
          auth={auth}
        />
      )}
    </div>
  );
}

export default Signup;
