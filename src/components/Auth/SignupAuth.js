import React from "react";
import InputField from "../inputs/InputField";

function SignupAuth({ email, setEmail, username, setUsername, setSteps }) {
  return (
    <div>
      <div className="w-1/2 mx-auto space-y-4">
        {/* username input */}
        <InputField
          name={"username"}
          id={"username"}
          type={"text"}
          placeHolder={"Your Username"}
          handleChange={setUsername}
          value={username}
          label={"Your Username"}
          required={true}
        />
        <InputField
          name={"email"}
          id={"email"}
          type={"email"}
          placeHolder={"Your email"}
          handleChange={setEmail}
          value={email}
          label={"Your Email"}
          required={true}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            setSteps(1);
          }}
          className="bg-active text-white rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SignupAuth;
