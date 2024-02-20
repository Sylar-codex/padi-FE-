import React, { useState } from "react";
import SignupAuth from "../components/Auth/SignupAuth";
import PasswordSet from "../components/Auth/PasswordSet";
import useInputState from "../hooks/inputHook";
import useAuthState from "../hooks/authHook";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [steps, setSteps] = useState(0);

  const { register, auth } = useAuthState();
  const [email, setEmail] = useInputState("");
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [passwordConfirm, setPasswordConfirm] = useInputState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== "" && passwordConfirm !== "") {
      if (password === passwordConfirm) {
        const payload = { email, username, password };
        register(payload);
      }
      if (auth.isAuthenticated) {
        navigate("/chat");
      }
    }
  };

  return (
    <div className="m-auto w-1/2 pt-72 pb-44 relative">
      <h2 className="w-1/2 my-6 mx-auto text-xl font-semibold">
        {steps === 0 ? "Sign Up" : "Provide Your Password"}
      </h2>
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
        />
      )}
    </div>
  );
}

export default Signup;
