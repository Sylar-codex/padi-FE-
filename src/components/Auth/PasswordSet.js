import React from "react";
import PasswordField from "../inputs/PasswordField";

function PasswordSet({
  setSteps,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  handleSubmit,
}) {
  return (
    <div>
      <div className="w-1/2 mx-auto space-y-4">
        {/* username input */}
        <PasswordField
          name={"password"}
          id={"password"}
          placeHolder={"Password"}
          handleChange={setPassword}
          value={password || ""}
          label={"Password"}
          required={true}
        />
        <PasswordField
          name={"password_confirm"}
          id={"password_confirm"}
          placeHolder={"Confirm Password"}
          handleChange={setPasswordConfirm}
          value={passwordConfirm || ""}
          label={"Confirm Password"}
          required={true}
        />
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => {
            setSteps(0);
          }}
          className="border border-gray-30 text-[#000000] rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Back
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-active text-white rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default PasswordSet;
