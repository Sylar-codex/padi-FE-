import React from "react";
import useinputState from "../../hooks/inputHook";
import { useNavigate } from "react-router-dom";
import InputField from "../inputs/InputField";

function UsernameInput() {
  const [username, setUsername] = useinputState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-1/2 mx-auto">
        {/* inputfield component */}
        <InputField
          name={"username"}
          id={"username"}
          type={"text"}
          placeHolder={"Your username"}
          handleChange={setUsername}
          value={username}
          label={"Your Username"}
          required={true}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            navigate("/login/password");
          }}
          className="bg-primary-50 text-white rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UsernameInput;
